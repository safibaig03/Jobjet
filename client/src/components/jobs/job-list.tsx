import { useQuery } from "@tanstack/react-query";
import { JobCard } from "@/components/jobs/job-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Job } from "@shared/schema";
import { useJobStore } from "@/store/job-store";
import { useEffect } from "react";
import { Link } from "wouter";

interface JobListProps {
  title?: string;
  showViewAll?: boolean;
  limit?: number;
  filterParams?: Record<string, string>;
}

export function JobList({
  title = "Featured Jobs",
  showViewAll = true,
  limit,
  filterParams = {},
}: JobListProps) {
  // Construct query string from filter params
  const queryString = Object.entries(filterParams)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  const { setJobs, setFeaturedJobs } = useJobStore();

  const { data: jobs, isLoading, error } = useQuery<Job[]>({
    queryKey: [`/api/jobs${queryString ? `?${queryString}` : ""}`],
  });

  // Update the job store when jobs are fetched
  useEffect(() => {
    if (jobs) {
      setJobs(jobs);
      setFeaturedJobs(jobs.slice(0, 6)); // First 6 jobs as featured
    }
  }, [jobs, setJobs, setFeaturedJobs]);

  // Generate skeletons for loading state
  const renderSkeletons = () => {
    return Array(limit || 3)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <div className="flex justify-between items-center">
            <Skeleton className="h-12 w-12 rounded-md" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-10 w-full mt-4" />
        </div>
      ));
  };

  // Don't show error message on home page, just show empty state
  if (error) {
    return (
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderSkeletons()}
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showViewAll && (
          <Link href="/jobs" className="text-primary hover:text-primary/90 font-medium">
            View all jobs →
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          renderSkeletons()
        ) : jobs && jobs.length > 0 ? (
          jobs.slice(0, limit).map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
