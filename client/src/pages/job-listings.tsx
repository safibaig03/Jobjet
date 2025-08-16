import { useEffect, useState } from "react";
import { useSearch } from "wouter";
import { JobCard } from "@/components/jobs/job-card";
import { JobSearch } from "@/components/jobs/job-search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Job } from "@shared/schema";
import { useJobStore } from "@/store/job-store";
import { Filter, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function JobListings() {
  const [search] = useSearch();
  const searchParams = new URLSearchParams(search);
  const searchTerm = searchParams.get("search") || "";
  const locationTerm = searchParams.get("location") || "";
  const companyId = searchParams.get("company") || "";
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Initialize filters from the URL
  const { setFilter, applyFilters, filters } = useJobStore();
  const [sortBy, setSortBy] = useState("newest");
  
  // Job type options
  const jobTypes = [
    { id: "full_time", label: "Full Time" },
    { id: "part_time", label: "Part Time" },
    { id: "contract", label: "Contract" },
    { id: "remote", label: "Remote" },
    { id: "internship", label: "Internship" },
  ];
  
  // Set filters from URL params when component mounts
  useEffect(() => {
    if (searchTerm) {
      setFilter("search", searchTerm);
    }
    if (locationTerm) {
      setFilter("location", locationTerm);
    }
    if (companyId) {
      // If company ID is provided, fetch jobs for that company directly
      setFilter("company", companyId);
    }
    
    // Apply filters initially to update filtered jobs
    applyFilters();
  }, [searchTerm, locationTerm, companyId, setFilter, applyFilters]);
  
  // Fetch jobs with filters
  const queryString = Object.entries(filters)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    .join("&");
  
  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: [`/api/jobs${queryString ? `?${queryString}` : ""}`],
  });
  
  // Handle job type filter change
  const handleJobTypeChange = (checked: boolean, type: string) => {
    if (checked) {
      setFilter("jobType", type);
    } else if (filters.jobType === type) {
      setFilter("jobType", "");
    }
    applyFilters();
  };
  
  // Handle sort change
  const handleSortChange = (value: string) => {
    setSortBy(value);
    // In a real app, you'd update the API call or sort the results
  };
  
  // Sort the jobs based on selected sort option
  const sortedJobs = jobs ? [...jobs].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return 0;
  }) : [];

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-8">
            <JobSearch />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-background rounded-lg border p-6 sticky top-24">
                <h2 className="text-lg font-medium mb-4">Filters</h2>
                
                <div className="space-y-6">
                  {/* Job Types */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Job Type</h3>
                    <div className="space-y-2">
                      {jobTypes.map((type) => (
                        <div key={type.id} className="flex items-center">
                          <Checkbox 
                            id={`job-type-${type.id}`} 
                            checked={filters.jobType === type.id}
                            onCheckedChange={(checked) => handleJobTypeChange(!!checked, type.id)}
                          />
                          <label 
                            htmlFor={`job-type-${type.id}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Experience Level */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Experience Level</h3>
                    <div className="space-y-2">
                      {["Entry Level", "Mid Level", "Senior Level", "Director", "Executive"].map((level) => (
                        <div key={level} className="flex items-center">
                          <Checkbox id={`exp-${level.toLowerCase().replace(/\s+/g, '-')}`} />
                          <label 
                            htmlFor={`exp-${level.toLowerCase().replace(/\s+/g, '-')}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Salary Range */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Salary Range</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Input placeholder="Min" type="number" />
                      </div>
                      <div>
                        <Input placeholder="Max" type="number" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Clear Filters */}
                  <Button variant="outline" className="w-full" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Mobile Filters Button */}
            <div className="lg:hidden mb-4">
              <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Job Filters</SheetTitle>
                    <SheetDescription>
                      Filter jobs to find your perfect match
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-4 space-y-6">
                    {/* Job Types */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Job Type</h3>
                      <div className="space-y-2">
                        {jobTypes.map((type) => (
                          <div key={type.id} className="flex items-center">
                            <Checkbox 
                              id={`mobile-job-type-${type.id}`} 
                              checked={filters.jobType === type.id}
                              onCheckedChange={(checked) => handleJobTypeChange(!!checked, type.id)}
                            />
                            <label 
                              htmlFor={`mobile-job-type-${type.id}`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {type.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Experience Level */}
                    <div>
                      <h3 className="text-sm font-medium mb-3">Experience Level</h3>
                      <div className="space-y-2">
                        {["Entry Level", "Mid Level", "Senior Level", "Director", "Executive"].map((level) => (
                          <div key={level} className="flex items-center">
                            <Checkbox id={`mobile-exp-${level.toLowerCase().replace(/\s+/g, '-')}`} />
                            <label 
                              htmlFor={`mobile-exp-${level.toLowerCase().replace(/\s+/g, '-')}`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Apply Button */}
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        applyFilters();
                        setIsMobileFilterOpen(false);
                      }}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Job Listings */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                  {searchTerm || locationTerm 
                    ? `Jobs ${searchTerm ? `for "${searchTerm}"` : ""} ${locationTerm ? `in ${locationTerm}` : ""}` 
                    : "All Jobs"}
                </h1>
                
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-by" className="text-sm font-medium">
                    Sort by:
                  </label>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger id="sort-by" className="w-[130px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="relevant">Relevant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-[400px] bg-muted rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : sortedJobs && sortedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sortedJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-muted/50 rounded-lg border">
                  <SlidersHorizontal className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h2 className="text-xl font-semibold mb-2">No jobs found</h2>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any jobs matching your criteria. Try adjusting your filters.
                  </p>
                  <Button variant="outline" onClick={() => {
                    setFilter("search", "");
                    setFilter("location", "");
                    setFilter("jobType", "");
                    applyFilters();
                  }}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      
    </div>
  );
}
