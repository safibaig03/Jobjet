import { create } from 'zustand';
import { Job } from '@shared/schema';

interface JobFilters {
  search?: string;
  location?: string;
  jobType?: string;
  category?: string;
}

interface JobStore {
  // Jobs state
  jobs: Job[];
  filteredJobs: Job[];
  featuredJobs: Job[];
  selectedJob: Job | null;
  isLoading: boolean;
  error: string | null;
  
  // Filters
  filters: JobFilters;
  
  // Actions
  setJobs: (jobs: Job[]) => void;
  setFeaturedJobs: (jobs: Job[]) => void;
  setSelectedJob: (job: Job | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setFilter: (key: keyof JobFilters, value: string) => void;
  clearFilters: () => void;
  applyFilters: () => void;
}

export const useJobStore = create<JobStore>((set, get) => ({
  // Initial state
  jobs: [],
  filteredJobs: [],
  featuredJobs: [],
  selectedJob: null,
  isLoading: false,
  error: null,
  
  filters: {
    search: '',
    location: '',
    jobType: '',
    category: '',
  },
  
  // Actions
  setJobs: (jobs) => set(state => ({
    jobs,
    filteredJobs: jobs,
  })),
  
  setFeaturedJobs: (featuredJobs) => set({ featuredJobs }),
  
  setSelectedJob: (selectedJob) => set({ selectedJob }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  setFilter: (key, value) => set(state => ({
    filters: {
      ...state.filters,
      [key]: value,
    }
  })),
  
  clearFilters: () => set(state => ({
    filters: {
      search: '',
      location: '',
      jobType: '',
      category: '',
    },
    filteredJobs: state.jobs,
  })),
  
  applyFilters: () => set(state => {
    const { search, location, jobType, category } = state.filters;
    
    let filtered = [...state.jobs];
    
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (location) {
      const locationLower = location.toLowerCase();
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(locationLower)
      );
    }
    
    if (jobType) {
      filtered = filtered.filter(job => job.jobType === jobType);
    }
    
    if (category) {
      // Filtering by category would be implemented here
      // This depends on how we structure the category-job relationship
    }
    
    return { filteredJobs: filtered };
  }),
}));
