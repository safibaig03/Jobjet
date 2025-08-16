import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Users, Target, Award, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About JobJet
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connecting talented professionals with innovative companies worldwide. 
            We're building the future of job searching and recruitment.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To democratize job opportunities by creating a seamless platform that connects 
                job seekers with their dream careers and helps companies find the perfect talent.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To become the world's most trusted platform for career growth and 
                talent acquisition, powered by innovative technology and human connection.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10K+</div>
            <div className="text-sm text-muted-foreground">Jobs Posted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5K+</div>
            <div className="text-sm text-muted-foreground">Companies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="text-sm text-muted-foreground">Job Seekers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </div>

        {/* Team */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Leadership</CardTitle>
                <CardDescription>Experienced executives driving innovation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our leadership team brings decades of experience in technology, 
                  recruitment, and business development.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engineering</CardTitle>
                <CardDescription>Talented developers building the future</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our engineering team creates cutting-edge solutions using 
                  the latest technologies and best practices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Success</CardTitle>
                <CardDescription>Dedicated support for your success</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our customer success team ensures you get the most out of 
                  our platform with personalized support.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to join us?
          </h2>
          <p className="text-muted-foreground mb-6">
            Start your journey with JobJet today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
