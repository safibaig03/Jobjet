import { Company } from "@shared/schema";
import { Link } from "wouter";

interface CompanyCardProps {
  company: Company;
  jobCount?: number;
}

export function CompanyCard({ company, jobCount = 0 }: CompanyCardProps) {
  // Generate fallback for company logo if not available
  const getFallbackInitial = () => {
    return company.name.charAt(0).toUpperCase();
  };

  return (
    <Link href={`/companies/${company.id}`}>
      <div className="flex flex-col items-center p-4 bg-background border border-border rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
          {company.logo ? (
            <img 
              src={company.logo} 
              alt={company.name} 
              className="w-8 h-8 object-contain"
            />
          ) : (
            <span className="text-lg font-semibold text-primary">
              {getFallbackInitial()}
            </span>
          )}
        </div>
        <h3 className="text-sm font-medium text-foreground text-center">{company.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{jobCount} jobs</p>
      </div>
    </Link>
  );
}

interface CompanyListProps {
  companies: Company[];
  jobCounts?: Record<number, number>;
}

export function CompanyList({ companies, jobCounts = {} }: CompanyListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {companies.map((company) => (
        <CompanyCard 
          key={company.id} 
          company={company} 
          jobCount={jobCounts[company.id] || Math.floor(Math.random() * 50) + 5} 
        />
      ))}
    </div>
  );
}
