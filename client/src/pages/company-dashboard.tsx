import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Job, Application } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { Link, useLocation } from "wouter";
import { Plus, Edit, Trash2, Eye, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function CompanyDashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("posted-jobs");

  // Fetch jobs posted by company
  const { data: jobs, isLoading: jobsLoading } = useQuery<Job[]>({
    queryKey: ["/api/dashboard/jobs"],
  });

  // Fetch applications for company's jobs
  const { data: applications, isLoading: applicationsLoading } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

  // Helper functions
  const getJobTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      full_time: "Full-time",
      part_time: "Part-time",
      contract: "Contract",
      remote: "Remote",
      internship: "Internship",
    };
    return labels[type] || type;
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      approved: "bg-green-100 text-green-800 hover:bg-green-200",
      rejected: "bg-red-100 text-red-800 hover:bg-red-200",
    };
    
    const statusIcons: Record<string, JSX.Element> = {
      pending: <Clock className="w-3 h-3 mr-1" />,
      approved: <CheckCircle className="w-3 h-3 mr-1" />,
      rejected: <XCircle className="w-3 h-3 mr-1" />,
    };
    
    return (
      <Badge className={statusColors[status] || "bg-gray-100 text-gray-800"}>
        <div className="flex items-center">
          {statusIcons[status]}
          <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
        </div>
      </Badge>
    );
  };

  // Handle job deletion
  const handleDeleteJob = async () => {
    if (!jobToDelete) return;
    
    try {
      await apiRequest("DELETE", `/api/jobs/${jobToDelete}`);
      
      // Invalidate jobs cache to refresh the list
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/jobs"] });
      
      toast({
        title: "Job deleted",
        description: "The job has been successfully deleted.",
      });
      
      setJobToDelete(null);
    } catch (error) {
      toast({
        title: "Failed to delete job",
        description: "An error occurred while deleting the job.",
        variant: "destructive",
      });
    }
  };

  // Handle application status update
  const updateApplicationStatus = async (applicationId: number, status: string) => {
    try {
      await apiRequest("PUT", `/api/applications/${applicationId}`, { status });
      
      // Invalidate applications cache to refresh the list
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      
      toast({
        title: "Status updated",
        description: `Application status has been updated to ${status}.`,
      });
    } catch (error) {
      toast({
        title: "Failed to update status",
        description: "An error occurred while updating the application status.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Company Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your jobs and review applications</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/post-job">
                <Button className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  Post New Job
                </Button>
              </Link>
            </div>
          </div>
          
          <Tabs 
            defaultValue="posted-jobs" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="posted-jobs">Posted Jobs</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="company-profile">Company Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posted-jobs">
              <Card>
                <CardHeader>
                  <CardTitle>Your Posted Jobs</CardTitle>
                  <CardDescription>Manage and track all the jobs you've posted</CardDescription>
                </CardHeader>
                <CardContent>
                  {jobsLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                      <p className="mt-2 text-muted-foreground">Loading your jobs...</p>
                    </div>
                  ) : jobs && jobs.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="px-4 py-3 text-left font-medium">Job Title</th>
                            <th className="px-4 py-3 text-left font-medium">Type</th>
                            <th className="px-4 py-3 text-left font-medium">Location</th>
                            <th className="px-4 py-3 text-left font-medium">Posted</th>
                            <th className="px-4 py-3 text-left font-medium">Status</th>
                            <th className="px-4 py-3 text-right font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jobs.map(job => (
                            <tr key={job.id} className="border-b hover:bg-muted/50">
                              <td className="px-4 py-4">{job.title}</td>
                              <td className="px-4 py-4">
                                <Badge variant="outline">{getJobTypeLabel(job.jobType)}</Badge>
                              </td>
                              <td className="px-4 py-4">{job.location}</td>
                              <td className="px-4 py-4">
                                {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                              </td>
                              <td className="px-4 py-4">
                                <Badge variant={job.isActive ? "default" : "secondary"}>
                                  {job.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </td>
                              <td className="px-4 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => navigate(`/job/${job.id}`)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => navigate(`/edit-job/${job.id}`)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <AlertDialog open={jobToDelete === job.id} onOpenChange={() => setJobToDelete(null)}>
                                    <AlertDialogTrigger asChild>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        className="text-red-500 hover:text-red-600"
                                        onClick={() => setJobToDelete(job.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone. This will permanently delete the job posting
                                          and remove all associated data.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction 
                                          className="bg-red-500 hover:bg-red-600"
                                          onClick={handleDeleteJob}
                                        >
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No jobs posted yet</h3>
                      <p className="text-muted-foreground mb-6">
                        You haven't posted any jobs yet. Create your first job posting now.
                      </p>
                      <Link href="/post-job">
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Post a Job
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle>Applications</CardTitle>
                  <CardDescription>Manage job applications from candidates</CardDescription>
                </CardHeader>
                <CardContent>
                  {applicationsLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                      <p className="mt-2 text-muted-foreground">Loading applications...</p>
                    </div>
                  ) : applications && applications.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="px-4 py-3 text-left font-medium">Applicant</th>
                            <th className="px-4 py-3 text-left font-medium">Job</th>
                            <th className="px-4 py-3 text-left font-medium">Applied</th>
                            <th className="px-4 py-3 text-left font-medium">Status</th>
                            <th className="px-4 py-3 text-right font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {applications.map(app => (
                            <tr key={app.id} className="border-b hover:bg-muted/50">
                              <td className="px-4 py-4">Applicant ID: {app.userId}</td>
                              <td className="px-4 py-4">Job ID: {app.jobId}</td>
                              <td className="px-4 py-4">
                                {formatDistanceToNow(new Date(app.submittedAt), { addSuffix: true })}
                              </td>
                              <td className="px-4 py-4">
                                {getStatusBadge(app.status)}
                              </td>
                              <td className="px-4 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => navigate(`/application/${app.id}`)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  {app.status === "pending" && (
                                    <>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        className="text-green-500 hover:text-green-600"
                                        onClick={() => updateApplicationStatus(app.id, "approved")}
                                      >
                                        <CheckCircle className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        className="text-red-500 hover:text-red-600"
                                        onClick={() => updateApplicationStatus(app.id, "rejected")}
                                      >
                                        <XCircle className="h-4 w-4" />
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                      <p className="text-muted-foreground">
                        You haven't received any job applications yet.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="company-profile">
              <Card>
                <CardHeader>
                  <CardTitle>Company Profile</CardTitle>
                  <CardDescription>Manage your company information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Company Information</h3>
                      <p className="text-muted-foreground mb-4">
                        This information will be displayed on your job postings and company profile.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-1">Company Name</label>
                          <div className="p-2 bg-muted rounded-md">{user?.name}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <div className="p-2 bg-muted rounded-md">{user?.email}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Username</label>
                          <div className="p-2 bg-muted rounded-md">{user?.username}</div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Role</label>
                          <div className="p-2 bg-muted rounded-md capitalize">{user?.role}</div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button>Edit Profile</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
