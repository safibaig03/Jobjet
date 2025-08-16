import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertJobSchema, InsertJob } from "@shared/schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";

// Enhanced job schema with custom validation
const jobFormSchema = insertJobSchema.extend({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  requirements: z.string().min(10, "Requirements must be at least 10 characters"),
  location: z.string().min(2, "Location is required"),
}).omit({ postedBy: true }); // Will be added in the submission handler

type JobFormData = z.infer<typeof jobFormSchema>;

export default function PostJob() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  // Fetch enum values (job types)
  const { data: enums } = useQuery<{ jobTypes: string[] }>({
    queryKey: ["/api/enums"],
  });

  // Fetch company info
  const { data: company } = useQuery({
    queryKey: ["/api/companies/user"],
    queryFn: async () => {
      const res = await fetch(`/api/companies/user/${user?.id}`);
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!user,
  });

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      location: "",
      salary: "",
      jobType: "full_time",
      experience: "",
      companyId: 0,
    },
  });

  // Update companyId when company data is loaded
  useEffect(() => {
    if (company) {
      form.setValue("companyId", company.id);
    }
  }, [company, form]);

  const onSubmit = async (data: JobFormData) => {
    try {
      // Add the current user's ID as the poster
      const fullJobData: InsertJob = {
        ...data,
        postedBy: user!.id,
      };

      await apiRequest("POST", "/api/jobs", fullJobData);
      
      // Invalidate queries to refresh job listings
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/jobs"] });
      
      toast({
        title: "Job posted successfully",
        description: "Your job has been published and is now live.",
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Failed to post job",
        description: "There was an error posting your job. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Senior Frontend Developer" {...field} />
                        </FormControl>
                        <FormDescription>
                          The title should clearly represent the position.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="jobType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select job type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {enums?.jobTypes?.map(type => (
                                <SelectItem key={type} value={type}>
                                  {type.split('_').map(word => 
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                  ).join(' ')}
                                </SelectItem>
                              )) || (
                                <>
                                  <SelectItem value="full_time">Full Time</SelectItem>
                                  <SelectItem value="part_time">Part Time</SelectItem>
                                  <SelectItem value="contract">Contract</SelectItem>
                                  <SelectItem value="remote">Remote</SelectItem>
                                  <SelectItem value="internship">Internship</SelectItem>
                                </>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. San Francisco, CA or Remote" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="salary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salary Range (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. $80,000 - $100,000" {...field} />
                          </FormControl>
                          <FormDescription>
                            Including salary information increases applications.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience Required</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 3+ years" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the role, responsibilities, and what a typical day looks like..." 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Be specific about the role, team, and company culture.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="requirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requirements</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List the qualifications, skills, and experience required..." 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Include both required and preferred qualifications.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Posting..." : "Post Job"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      
    </div>
  );
}
