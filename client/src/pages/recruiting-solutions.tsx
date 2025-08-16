import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Users, Target, BarChart3, Zap, Shield, Globe, Headphones, Award } from "lucide-react";

export default function RecruitingSolutions() {
  const solutions = [
    {
      icon: Users,
      title: "Smart Candidate Matching",
      description: "AI-powered algorithms that match the right candidates to your job requirements",
      features: ["Skills-based matching", "Experience level filtering", "Cultural fit assessment"],
    },
    {
      icon: Target,
      title: "Targeted Job Promotion",
      description: "Reach the most qualified candidates with our targeted advertising solutions",
      features: ["Social media promotion", "Email campaigns", "Industry-specific targeting"],
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive insights into your recruitment performance and candidate pipeline",
      features: ["Application tracking", "Source analytics", "Time-to-hire metrics"],
    },
    {
      icon: Zap,
      title: "Automated Workflows",
      description: "Streamline your hiring process with customizable automation tools",
      features: ["Application screening", "Interview scheduling", "Communication automation"],
    },
    {
      icon: Shield,
      title: "Compliance & Security",
      description: "Ensure your hiring process meets all legal and security requirements",
      features: ["GDPR compliance", "Data encryption", "Audit trails"],
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access talent from around the world with our international recruitment tools",
      features: ["Multi-language support", "Local compliance", "Global candidate pool"],
    },
  ];

  const pricing = [
    {
      name: "Starter",
      price: "$99",
      period: "per month",
      description: "Perfect for small businesses",
      features: ["Up to 5 job postings", "Basic candidate matching", "Email support"],
    },
    {
      name: "Professional",
      price: "$299",
      period: "per month",
      description: "Ideal for growing companies",
      features: ["Up to 25 job postings", "Advanced analytics", "Priority support", "Custom branding"],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations",
      features: ["Unlimited postings", "Dedicated manager", "Custom integrations", "White-label solutions"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Recruiting Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your hiring process with JobJet's comprehensive recruitment platform. 
            Find the best talent faster and more efficiently than ever before.
          </p>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50%</div>
            <div className="text-sm text-muted-foreground">Faster Hiring</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">3x</div>
            <div className="text-sm text-muted-foreground">More Qualified Candidates</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">90%</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Platform Access</div>
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Solutions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <Card key={solution.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <solution.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{solution.title}</CardTitle>
                  <CardDescription>{solution.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="text-2xl font-bold text-primary">1</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Post Your Job</h3>
              <p className="text-muted-foreground">
                Create compelling job postings with our easy-to-use job builder. 
                Add requirements, benefits, and company culture details.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="text-2xl font-bold text-primary">2</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Matching</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your requirements and matches them with qualified candidates 
                from our extensive talent pool.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="text-2xl font-bold text-primary">3</div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Hire Successfully</h3>
              <p className="text-muted-foreground">
                Review matched candidates, conduct interviews, and make offers through 
                our streamlined hiring process.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan) => (
              <Card key={plan.name} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.name === "Enterprise" ? "/contact" : "/auth"}>
                    <Button className="w-full">
                      {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  TechCorp Solutions
                </CardTitle>
                <CardDescription>Software Company • 200+ employees</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  "JobJet helped us reduce our time-to-hire by 60% and find exceptional 
                  developers who perfectly fit our culture."
                </p>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">• HR Director</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  GrowthStart Inc.
                </CardTitle>
                <CardDescription>Startup • 50 employees</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  "The AI-powered candidate matching saved us countless hours of screening. 
                  We found our perfect product manager in just 2 weeks."
                </p>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">Mike Chen</div>
                  <div className="text-sm text-muted-foreground">• CEO & Founder</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of companies already using JobJet to find their perfect hires.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg">Start Free Trial</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">Schedule Demo</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
