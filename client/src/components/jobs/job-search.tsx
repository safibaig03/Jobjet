import { useState, FormEvent } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { useJobStore } from "@/store/job-store";

export function JobSearch() {
  const { filters, setFilter } = useJobStore();
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [location, setLocation] = useState(filters.location || "");
  const [, navigate] = useLocation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Update filters in the store
    setFilter("search", searchTerm);
    setFilter("location", location);
    
    // Navigate to jobs page with query params
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.set("search", searchTerm);
    if (location) queryParams.set("location", location);
    
    navigate(`/jobs?${queryParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 w-full max-w-3xl mx-auto">
      <div className="flex-1 min-w-0">
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input 
            type="text" 
            placeholder="Job title, keywords, or company" 
            className="pl-10 py-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input 
            type="text" 
            placeholder="City, state, or remote" 
            className="pl-10 py-6"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
      
      <Button type="submit" size="lg" className="px-8">
        Search
      </Button>
    </form>
  );
}

export function PopularSearches() {
  const [, navigate] = useLocation();
  const { setFilter } = useJobStore();
  
  const handleSearchClick = (term: string) => {
    setFilter("search", term);
    navigate(`/jobs?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className="mt-4 text-sm text-muted-foreground flex justify-center flex-wrap gap-x-6 gap-y-2">
      <span>Popular: </span>
      <button 
        onClick={() => handleSearchClick("Remote")}
        className="text-primary hover:text-primary/90"
      >
        Remote
      </button>
      <button 
        onClick={() => handleSearchClick("Software Engineer")}
        className="text-primary hover:text-primary/90"
      >
        Software Engineer
      </button>
      <button 
        onClick={() => handleSearchClick("Data Scientist")}
        className="text-primary hover:text-primary/90"
      >
        Data Scientist
      </button>
      <button 
        onClick={() => handleSearchClick("Marketing")}
        className="text-primary hover:text-primary/90"
      >
        Marketing
      </button>
    </div>
  );
}