import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Download, Mail, Calendar, FileText, Image, Users } from "lucide-react";

export default function Press() {
  const pressReleases = [
    {
      id: 1,
      title: "JobJet Raises $10M Series A Funding to Expand AI-Powered Job Matching",
      date: "2024-01-15",
      excerpt: "Company plans to enhance its machine learning algorithms and expand into new markets.",
      category: "Funding",
    },
    {
      id: 2,
      title: "JobJet Launches New Mobile App for Job Seekers",
      date: "2024-01-10",
      excerpt: "The new app features enhanced search capabilities and real-time job alerts.",
      category: "Product Launch",
    },
    {
      id: 3,
      title: "JobJet Partners with Top Universities for Student Recruitment",
      date: "2024-01-05",
      excerpt: "Strategic partnership aims to connect students with entry-level opportunities.",
      category: "Partnership",
    },
  ];

  const mediaKit = [
    {
      name: "Company Logo",
      description: "High-resolution JobJet logos in various formats",
      icon: Image,
      downloadUrl: "#",
    },
    {
      name: "Brand Guidelines",
      description: "Complete brand style guide and usage instructions",
      icon: FileText,
      downloadUrl: "#",
    },
    {
      name: "Product Screenshots",
      description: "High-quality screenshots of our platform",
      icon: Image,
      downloadUrl: "#",
    },
    {
      name: "Team Photos",
      description: "Professional headshots of our leadership team",
      icon: Users,
      downloadUrl: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Press & Media
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay up to date with the latest news, press releases, and company updates from JobJet. 
            For media inquiries, please contact our press team.
          </p>
        </div>

        {/* Contact Info */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Media Inquiries</CardTitle>
            <CardDescription>
              Journalists and media professionals can reach our press team for interviews, 
              statements, and additional information.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="font-medium">press@jobjet.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">+1 (555) 123-4567</span>
              </div>
            </div>
            <Button className="mt-4">
              <Mail className="h-4 w-4 mr-2" />
              Contact Press Team
            </Button>
          </CardContent>
        </Card>

        {/* Press Releases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map((release) => (
              <Card key={release.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{release.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(release.date).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{release.title}</CardTitle>
                  <CardDescription className="text-base">{release.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">
                    Read Full Release
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Media Kit */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Media Kit</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {mediaKit.map((item) => (
              <Card key={item.name} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <item.icon className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Facts */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Company Facts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-primary">2019</CardTitle>
                <CardDescription>Founded</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  JobJet was founded with a mission to revolutionize job searching and recruitment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-primary">50+</CardTitle>
                <CardDescription>Team Members</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Our diverse team spans across engineering, product, sales, and customer success.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-primary">25+</CardTitle>
                <CardDescription>Countries Served</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  We're expanding globally to serve job seekers and employers worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>CEO & Founder</CardTitle>
                <CardDescription>John Smith</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Former VP of Engineering at TechCorp with 15+ years of experience in HR technology.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>CTO</CardTitle>
                <CardDescription>Sarah Johnson</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Expert in machine learning and AI with a PhD in Computer Science from Stanford.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>Head of Product</CardTitle>
                <CardDescription>Michael Chen</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Product leader with experience at LinkedIn and Google, focused on user experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Need More Information?</h2>
          <p className="text-muted-foreground mb-6">
            Our press team is ready to help with any media requests or questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="outline" size="lg">Contact Us</Button>
            </Link>
            <Button size="lg">
              <Mail className="h-4 w-4 mr-2" />
              Press Inquiry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
