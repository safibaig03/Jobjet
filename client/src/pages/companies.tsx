import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { Company } from "@shared/schema";
import { useLocation } from "wouter";

export default function Companies() {
  const [, navigate] = useLocation();
  const { data: companies, isLoading } = useQuery<Company[]>({
    queryKey: ["/api/companies"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading companies...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
        <p className="text-muted-foreground mt-2">
          Discover top companies and their job opportunities
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {companies?.map((company) => (
          <Card key={company.id} className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:scale-105 border-border hover:border-primary/50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2 text-foreground hover:text-primary transition-colors">
                    {company.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {company.description}
                  </CardDescription>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center ml-4">
                  <UsersIcon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                {company.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPinIcon className="h-4 w-4 text-primary" />
                    {company.location}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  <Badge className="text-xs bg-primary/20 text-primary hover:bg-primary/30">
                    Company
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => navigate(`/jobs?company=${company.id}`)}
                >
                  View Jobs
                </Button>
                {company.website && (
                  <Button variant="outline" size="icon" className="border-primary/20 hover:border-primary hover:bg-primary/5" asChild>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLinkIcon className="h-4 w-4 text-primary" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!companies || companies.length === 0) && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <UsersIcon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2 text-foreground">No companies found</h3>
          <p className="text-muted-foreground">
            Companies will appear here once they register on the platform.
          </p>
        </div>
      )}
    </div>
  );
}