import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Briefcase, MapPin, DollarSign } from "lucide-react";
import { Job } from "@shared/schema";
import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const jobTypeColors: Record<string, string> = {
    full_time: "bg-green-100 text-green-800 hover:bg-green-200",
    part_time: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    contract: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    remote: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
    internship: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  };

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

  return (
    <Card className="job-card overflow-hidden shadow hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-md flex items-center justify-center">
            <span className="text-lg font-bold text-primary">
              {job.title.charAt(0)}
            </span>
          </div>
          <div>
            <Badge className={jobTypeColors[job.jobType] || "bg-gray-100 text-gray-800"}>
              {getJobTypeLabel(job.jobType)}
            </Badge>
          </div>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">{job.title}</h3>
        <div className="text-sm text-muted-foreground mb-3">
          {job.companyId} · {job.location}
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Briefcase className="flex-shrink-0 mr-1.5 h-5 w-5 text-muted-foreground" />
            {job.experience}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="flex-shrink-0 mr-1.5 h-5 w-5 text-muted-foreground" />
            Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          </div>
          {job.salary && (
            <div className="flex items-center text-sm text-primary font-medium">
              <DollarSign className="flex-shrink-0 mr-1.5 h-5 w-5 text-primary" />
              {job.salary}
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {job.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {/* Tags would go here */}
          <Badge variant="outline" className="bg-accent/50">React</Badge>
          <Badge variant="outline" className="bg-accent/50">TypeScript</Badge>
          <Badge variant="outline" className="bg-accent/50">Node.js</Badge>
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-4 border-t bg-muted/50 px-6 py-3">
        <Link href={`/job/${job.id}`}>
          <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
