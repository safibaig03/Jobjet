import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, Database, Users, Globe } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Last updated: January 15, 2024
          </div>
        </div>

        {/* Key Points */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We use industry-standard encryption and security measures to protect your data.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We're transparent about what data we collect and how we use it.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Your Control</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You have full control over your data and can request deletion at any time.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Information We Collect */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Personal Information</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Name, email address, and contact information</li>
                <li>Professional experience and qualifications</li>
                <li>Resume and cover letter content</li>
                <li>Job preferences and search criteria</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Usage Information</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Job search history and applications</li>
                <li>Platform usage patterns and preferences</li>
                <li>Communication with employers or candidates</li>
                <li>Technical information (IP address, browser type)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">For Job Seekers</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Match you with relevant job opportunities</li>
                  <li>Send job alerts and notifications</li>
                  <li>Connect you with potential employers</li>
                  <li>Improve our job matching algorithms</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">For Employers</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Display your job postings to candidates</li>
                  <li>Provide applicant management tools</li>
                  <li>Send recruitment insights and analytics</li>
                  <li>Facilitate communication with candidates</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Sharing */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Data Sharing and Disclosure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li><strong>With your consent:</strong> When you explicitly agree to share information</li>
              <li><strong>For job matching:</strong> To connect job seekers with employers</li>
              <li><strong>Service providers:</strong> With trusted partners who help us operate our platform</li>
              <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We implement comprehensive security measures to protect your data:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Technical Measures</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>End-to-end encryption</li>
                  <li>Secure data centers</li>
                  <li>Regular security audits</li>
                  <li>Access controls and monitoring</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Organizational Measures</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Employee training on data protection</li>
                  <li>Strict access policies</li>
                  <li>Incident response procedures</li>
                  <li>Regular privacy assessments</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Privacy Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You have the following rights regarding your personal information:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Access and Control</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>View and update your information</li>
                  <li>Download your data</li>
                  <li>Delete your account</li>
                  <li>Opt-out of communications</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Data Portability</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Export your data</li>
                  <li>Transfer to other services</li>
                  <li>Request data correction</li>
                  <li>Limit data processing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              If you have questions about this privacy policy or our data practices, please contact us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> privacy@jobjet.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Innovation Drive, Tech City, TC 12345</p>
            </div>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Policy Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We may update this privacy policy from time to time. We will notify you of any material changes 
              by posting the new policy on this page and updating the "Last updated" date. We encourage you 
              to review this policy periodically.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
