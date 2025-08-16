import { useQuery } from "@tanstack/react-query";
import { JobSearch, PopularSearches } from "@/components/jobs/job-search";
import { JobList } from "@/components/jobs/job-list";
import { CategoryList } from "@/components/jobs/category-card";
import { CompanyList } from "@/components/companies/company-card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Link } from "wouter";
import { Category, Company } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";

export default function HomePage() {
  const { user, isJobSeeker, isCompany } = useAuth();

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Fetch companies
  const { data: companies, isLoading: companiesLoading } = useQuery<Company[]>({
    queryKey: ["/api/companies"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 md:pb-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Find Your Dream Job</span>
              <span className="block text-primary">Start Your Journey Today</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover thousands of job opportunities with top employers. Your next career move is just a click away.
            </p>
            
            <div className="mt-8 md:mt-12 w-full max-w-3xl mx-auto">
              <JobSearch />
              <PopularSearches />
            </div>
          </div>
        </div>
        
        {/* Featured Jobs Section */}
        <div className="bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <JobList limit={6} />
          </div>
        </div>
        
        {/* Categories Section */}
        <div className="bg-gray-50 dark:bg-slate-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Popular Job Categories</h2>
              <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto">
                Explore opportunities across different industries and find your perfect role
              </p>
            </div>
            
            {categoriesLoading ? (
              <div className="text-center">Loading categories...</div>
            ) : categories ? (
              <CategoryList categories={categories} />
            ) : (
              <div className="text-center text-muted-foreground">No categories found</div>
            )}
          </div>
        </div>
        
        {/* Featured Companies Section */}
        <div className="bg-background py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Featured Companies</h2>
              <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto">
                Connect with top employers actively hiring on our platform
              </p>
            </div>
            
            {companiesLoading ? (
              <div className="text-center">Loading companies...</div>
            ) : companies && companies.length > 0 ? (
              <CompanyList companies={companies.slice(0, 6)} />
            ) : (
              <div className="text-center text-muted-foreground">No companies found</div>
            )}
            
            <div className="mt-10 text-center">
              <Link href="/companies">
                <Button size="lg" variant="outline">View All Companies</Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Job Seeker CTA */}
        {!user && (
          <div className="bg-primary dark:bg-primary/80">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20 flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to take the next step?</span>
                  <span className="block">Create your profile today.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-primary-100">
                  Join thousands of job seekers who have found their next opportunity through JobJet. Create your profile, upload your resume, and get matched with the perfect job.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="/auth">
                    <Button size="lg" variant="default" className="bg-white text-primary hover:bg-gray-100">
                      Create Profile
                    </Button>
                  </Link>
                  <Link href="/jobs">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                      Browse Jobs
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <svg
                  className="h-56 w-auto sm:h-72 md:h-80 lg:h-96"
                  viewBox="0 0 786 786"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M393 0C175.923 0 0 175.923 0 393C0 610.077 175.923 786 393 786C610.077 786 786 610.077 786 393C786 175.923 610.077 0 393 0ZM393 714.545C215.495 714.545 71.4545 570.505 71.4545 393C71.4545 215.495 215.495 71.4545 393 71.4545C570.505 71.4545 714.545 215.495 714.545 393C714.545 570.505 570.505 714.545 393 714.545Z"
                    fill="white"
                    fillOpacity="0.1"
                  />
                  <path
                    d="M393 143C254.929 143 143 254.929 143 393C143 531.071 254.929 643 393 643C531.071 643 643 531.071 643 393C643 254.929 531.071 143 393 143ZM393 571.545C294.606 571.545 214.455 491.394 214.455 393C214.455 294.606 294.606 214.455 393 214.455C491.394 214.455 571.545 294.606 571.545 393C571.545 491.394 491.394 571.545 393 571.545Z"
                    fill="white"
                    fillOpacity="0.1"
                  />
                  <circle cx="393" cy="393" r="107" fill="white" fillOpacity="0.1" />
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {/* Employer CTA */}
        {!isCompany && (
          <div className="bg-gray-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
              <div className="bg-background rounded-lg shadow-xl overflow-hidden">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                  <div className="px-6 py-10 lg:px-8 lg:py-12">
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                      For Employers
                    </h3>
                    <p className="mt-4 text-lg text-muted-foreground">
                      Find the perfect candidates quickly and efficiently. Post jobs, screen applicants, and build your team with our powerful recruiting tools.
                    </p>
                    <div className="mt-8">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-700 dark:text-gray-300">
                          Reach thousands of qualified candidates
                        </p>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-700 dark:text-gray-300">
                          AI-powered matching technology
                        </p>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="ml-3 text-base text-gray-700 dark:text-gray-300">
                          Streamlined application management
                        </p>
                      </div>
                    </div>
                    <div className="mt-10">
                      <Link href={user ? "/post-job" : "/auth"}>
                        <Button size="lg">Post a Job</Button>
                      </Link>
                    </div>
                  </div>
                  <div className="relative h-64 lg:h-auto">
                    <svg
                      className="absolute inset-0 h-full w-full object-cover"
                      viewBox="0 0 800 600"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="800" height="600" fill="#6366F1" />
                      <path
                        d="M400 50C150 50 50 250 50 400C50 550 150 550 400 550C650 550 750 400 750 250C750 100 650 50 400 50Z"
                        fill="#818CF8"
                      />
                      <circle cx="400" cy="300" r="100" fill="#A5B4FC" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
