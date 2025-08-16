import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Tips for Your Next Job Interview",
      excerpt: "Master the art of job interviews with these proven strategies that will help you stand out from the competition and land your dream job.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Career Advice",
      image: "/api/placeholder/400/250",
    },
    {
      id: 2,
      title: "How to Build a Standout Resume in 2024",
      excerpt: "Learn the latest resume writing techniques and formatting tips to create a resume that gets past ATS systems and impresses hiring managers.",
      author: "Michael Chen",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Resume Writing",
      image: "/api/placeholder/400/250",
    },
    {
      id: 3,
      title: "Remote Work: The Future of Employment",
      excerpt: "Explore how remote work is reshaping the job market and what skills you need to thrive in this new work environment.",
      author: "Emily Rodriguez",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Workplace Trends",
      image: "/api/placeholder/400/250",
    },
    {
      id: 4,
      title: "Salary Negotiation Strategies That Work",
      excerpt: "Discover proven techniques for negotiating your salary and benefits package to ensure you're compensated fairly for your skills and experience.",
      author: "David Thompson",
      date: "2024-01-08",
      readTime: "8 min read",
      category: "Salary & Benefits",
      image: "/api/placeholder/400/250",
    },
    {
      id: 5,
      title: "Building Your Personal Brand Online",
      excerpt: "Learn how to create a strong online presence that showcases your expertise and attracts career opportunities.",
      author: "Lisa Wang",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Personal Branding",
      image: "/api/placeholder/400/250",
    },
    {
      id: 6,
      title: "Networking Strategies for Career Growth",
      excerpt: "Learn effective networking techniques that can open doors to new opportunities and accelerate your career progression.",
      author: "Alex Kumar",
      date: "2024-01-03",
      readTime: "9 min read",
      category: "Career Development",
      image: "/api/placeholder/400/250",
    },
  ];

  const categories = [
    "All Posts",
    "Career Advice",
    "Resume Writing",
    "Workplace Trends",
    "Salary & Benefits",
    "Personal Branding",
    "Technology",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            JobJet Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert insights, career tips, and industry trends to help you succeed in your professional journey.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant={category === "All Posts" ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="p-8">
                <Badge variant="secondary" className="mb-4">
                  Featured Post
                </Badge>
                <CardTitle className="text-3xl mb-4">
                  {blogPosts[0].title}
                </CardTitle>
                <CardDescription className="text-lg mb-6">
                  {blogPosts[0].excerpt}
                </CardDescription>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(blogPosts[0].date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <Button size="lg">
                  Read Full Article
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary/20">10</div>
                  <div className="text-xl font-semibold text-foreground">Essential Tips</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary/30">📝</div>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <Button variant="outline" className="w-full">
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="text-center p-8">
          <CardHeader>
            <CardTitle className="text-2xl">Stay Updated</CardTitle>
            <CardDescription>
              Get the latest career tips and job market insights delivered to your inbox.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
