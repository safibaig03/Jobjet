import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Application, Job } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { Clock, CheckCircle, XCircle, Eye, FileText } from "lucide-react";

export default function Applications() {
  const { user, isJobSeeker } = useAuth();

  // Fetch user's applications
  const { data: applications, isLoading } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

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
      <Navbar />
      
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
                            {/* In a real app, you'd fetch the job title */}
                            <div className="font-medium">Job ID: {application.jobId}</div>
                            <div className="text-sm text-muted-foreground">
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
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex items-center gap-1"
                              onClick={() => window.open(`/job/${application.jobId}`, '_blank')}
                            >
                              <Eye className="h-4 w-4" />
                              <span className="hidden sm:inline">View Job</span>
                            </Button>
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
      
      <Footer />
    </div>
  );
}
