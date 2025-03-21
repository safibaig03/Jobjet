import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Job } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { 
  Briefcase, 
  CalendarDays, 
  DollarSign, 
  MapPin, 
  LinkIcon,
  Building,
  ArrowLeft
} from "lucide-react";
import { useJobStore } from "@/store/job-store";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function JobDetails() {
  const { id } = useParams();
  const jobId = parseInt(id);
  const [, navigate] = useLocation();
  const { user, isJobSeeker } = useAuth();
  const { setSelectedJob } = useJobStore();
  const { toast } = useToast();

  // Fetch job details
  const { data: job, isLoading, error } = useQuery<Job>({
    queryKey: [`/api/jobs/${jobId}`],
  });

  // Apply for job mutation
  const handleApply = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const applicationData = {
        jobId,
        userId: user.id,
        resume: "Uploaded resume", // In a real app, this would be a file upload
        coverLetter: "Cover letter content" // In a real app, this would be user input
      };

      await apiRequest("POST", `/api/jobs/${jobId}/apply`, applicationData);
      
      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully.",
      });
    } catch (error) {
      toast({
        title: "Application failed",
        description: "Failed to submit your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (job) {
      setSelectedJob(job);
    }
    
    return () => {
      setSelectedJob(null);
    };
  }, [job, setSelectedJob]);

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

  const getJobTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
      full_time: "bg-green-100 text-green-800 hover:bg-green-200",
      part_time: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      contract: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      remote: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
      internship: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow p-6">
          <div className="max-w-4xl mx-auto bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800 text-center">
            <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">Job Not Found</h2>
            <p className="text-red-600 dark:text-red-300 mb-4">The job you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/jobs")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button 
            onClick={() => navigate("/jobs")}
            className="flex items-center text-primary hover:text-primary/90 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </button>
          
          {/* Job Header */}
          <div className="bg-background shadow rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 h-16 w-16 bg-primary/10 rounded-md flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {job.title.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <Badge className={getJobTypeColor(job.jobType)}>
                      {getJobTypeLabel(job.jobType)}
                    </Badge>
                  </div>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground mb-4">
                  <div className="flex items-center text-sm">
                    <Building className="flex-shrink-0 mr-1.5 h-5 w-5" />
                    <span>Company {job.companyId}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CalendarDays className="flex-shrink-0 mr-1.5 h-5 w-5" />
                    <span>Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
              
              {isJobSeeker && (
                <div className="mt-4 md:mt-0">
                  <Button size="lg" onClick={handleApply}>
                    Apply Now
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-line">{job.description}</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Requirements */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-line">{job.requirements}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Overview */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Job Overview</h2>
                  <ul className="space-y-4">
                    {job.salary && (
                      <li className="flex items-start">
                        <DollarSign className="h-5 w-5 text-primary mt-0.5 mr-3" />
                        <div>
                          <span className="block text-sm font-medium">Salary</span>
                          <span className="block text-sm text-muted-foreground">{job.salary}</span>
                        </div>
                      </li>
                    )}
                    
                    <li className="flex items-start">
                      <Briefcase className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <span className="block text-sm font-medium">Job Type</span>
                        <span className="block text-sm text-muted-foreground">{getJobTypeLabel(job.jobType)}</span>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <span className="block text-sm font-medium">Location</span>
                        <span className="block text-sm text-muted-foreground">{job.location}</span>
                      </div>
                    </li>
                    
                    {job.experience && (
                      <li className="flex items-start">
                        <Briefcase className="h-5 w-5 text-primary mt-0.5 mr-3" />
                        <div>
                          <span className="block text-sm font-medium">Experience</span>
                          <span className="block text-sm text-muted-foreground">{job.experience}</span>
                        </div>
                      </li>
                    )}
                    
                    <li className="flex items-start">
                      <CalendarDays className="h-5 w-5 text-primary mt-0.5 mr-3" />
                      <div>
                        <span className="block text-sm font-medium">Posted Date</span>
                        <span className="block text-sm text-muted-foreground">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* Skills */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-accent/50">React</Badge>
                    <Badge variant="outline" className="bg-accent/50">TypeScript</Badge>
                    <Badge variant="outline" className="bg-accent/50">Node.js</Badge>
                    <Badge variant="outline" className="bg-accent/50">MongoDB</Badge>
                    <Badge variant="outline" className="bg-accent/50">Express</Badge>
                  </div>
                </CardContent>
              </Card>
              
              {/* Apply Button (Mobile) */}
              {isJobSeeker && (
                <div className="lg:hidden">
                  <Button className="w-full" size="lg" onClick={handleApply}>
                    Apply Now
                  </Button>
                </div>
              )}
              
              {/* Share Job */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Share This Job</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" aria-label="Share on Twitter">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Share on LinkedIn">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.223 0h.002z" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Share on Facebook">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </Button>
                    <Button variant="outline" className="flex-1" aria-label="Copy link">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Copy Link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
