import { useQuery, useQueries } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Application, Job } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { Clock, CheckCircle, XCircle, Eye, FileText, Briefcase, MapPin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";

export default function Applications() {
  const { user, isJobSeeker } = useAuth();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Fetch user's applications
  const { data: applications, isLoading } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });
  
  // Fetch job details for each application
  const jobQueries = useQueries({
    queries: (applications || []).map(application => ({
      queryKey: [`/api/jobs/${application.jobId}`],
      enabled: !!applications?.length,
    })),
  });
  
  // Create a map of job details by job ID
  const jobsMap = jobQueries.reduce((acc, query, index) => {
    if (query.data && applications?.[index]) {
      acc[applications[index].jobId] = query.data as Job;
    }
    return acc;
  }, {} as Record<number, Job>);
  
  // Check if all job queries are loading
  const isJobsLoading = jobQueries.some(query => query.isLoading);
  
  // View application details
  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
  };

  // Helper functions
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

  return (
    <div className="min-h-screen flex flex-col">      
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">My Applications</h1>
          <p className="text-muted-foreground mb-8">
            {isJobSeeker 
              ? "Track the status of your job applications" 
              : "View applications for your job postings"}
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle>Application History</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                  <p className="mt-2 text-muted-foreground">Loading your applications...</p>
                </div>
              ) : applications && applications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left font-medium">Job</th>
                        <th className="px-4 py-3 text-left font-medium">Applied Date</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                        <th className="px-4 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map(application => (
                        <tr key={application.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-4">
                            {jobsMap[application.jobId] ? (
                              <>
                                <div className="font-medium">{jobsMap[application.jobId].title}</div>
                                <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                  <Briefcase className="h-3 w-3" />
                                  <span>{jobsMap[application.jobId].jobType}</span>
                                  <span className="mx-1">•</span>
                                  <MapPin className="h-3 w-3" />
                                  <span>{jobsMap[application.jobId].location}</span>
                                </div>
                              </>
                            ) : (
                              <div className="font-medium">Job ID: {application.jobId}</div>
                            )}
                            <div className="text-xs text-muted-foreground mt-1">
                              Application #{application.id}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            {formatDistanceToNow(new Date(application.submittedAt), { addSuffix: true })}
                          </td>
                          <td className="px-4 py-4">
                            {getStatusBadge(application.status)}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => handleViewApplication(application)}
                                    >
                                      <FileText className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>View Application</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => window.open(`/job/${application.jobId}`, '_blank')}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>View Job</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
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
                  <p className="text-muted-foreground mb-6">
                    {isJobSeeker 
                      ? "You haven't applied to any jobs yet. Start your job search and apply today!" 
                      : "You haven't received any applications yet."}
                  </p>
                  {isJobSeeker && (
                    <Button onClick={() => window.location.href = "/jobs"}>
                      Browse Jobs
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Application Details Dialog */}
      {selectedApplication && (
        <Dialog open={!!selectedApplication} onOpenChange={(open) => !open && setSelectedApplication(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {jobsMap[selectedApplication.jobId]?.title || `Job ID: ${selectedApplication.jobId}`}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Badge variant="outline">{getStatusBadge(selectedApplication.status)}</Badge>
                  <span>•</span>
                  <span>Submitted {formatDistanceToNow(new Date(selectedApplication.submittedAt), { addSuffix: true })}</span>
                </div>
              </div>
              
              <div className="border rounded-md p-4 bg-muted/30">
                <h4 className="font-medium mb-2">Resume/CV</h4>
                <div className="whitespace-pre-line text-sm">{selectedApplication.resume}</div>
              </div>
              
              <div className="border rounded-md p-4 bg-muted/30">
                <h4 className="font-medium mb-2">Cover Letter</h4>
                <div className="whitespace-pre-line text-sm">{selectedApplication.coverLetter}</div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => window.open(`/job/${selectedApplication.jobId}`, '_blank')}
                className="flex items-center gap-1"
              >
                <Eye className="h-4 w-4" />
                View Job
              </Button>
              <Button onClick={() => setSelectedApplication(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
