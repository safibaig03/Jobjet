import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield, Users, AlertTriangle, CheckCircle, Info } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Please read these terms carefully before using our platform. By using JobJet, you agree to these terms.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Last updated: January 15, 2024
          </div>
        </div>

        {/* Key Terms */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Acceptance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                By using our platform, you agree to these terms and our privacy policy.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>User Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You have the right to use our platform in accordance with these terms.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Users are responsible for their actions and content on our platform.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Service Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Service Description
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              JobJet is a job board platform that connects job seekers with employers. Our services include:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>Job posting and management for employers</li>
              <li>Job search and application tools for job seekers</li>
              <li>Resume and profile management</li>
              <li>Communication tools between employers and candidates</li>
              <li>Analytics and reporting features</li>
            </ul>
          </CardContent>
        </Card>

        {/* User Accounts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              User Accounts and Registration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Account Creation</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining account security</li>
                <li>One account per person is allowed</li>
                <li>You must be at least 18 years old to create an account</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Account Responsibilities</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Keep your login credentials secure</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>You are responsible for all activities under your account</li>
                <li>Maintain accurate and up-to-date information</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Acceptable Use */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Acceptable Use Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You agree not to use our platform for any unlawful or prohibited purpose. Prohibited activities include:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Forbidden Actions</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Posting false or misleading information</li>
                  <li>Harassing or discriminating against others</li>
                  <li>Violating intellectual property rights</li>
                  <li>Attempting to gain unauthorized access</li>
                  <li>Spamming or sending unsolicited messages</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Content Guidelines</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>No offensive or inappropriate content</li>
                  <li>No false job postings or scams</li>
                  <li>Respect privacy and confidentiality</li>
                  <li>Comply with applicable laws and regulations</li>
                  <li>Maintain professional conduct</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Intellectual Property Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Our Rights</h4>
              <p className="text-sm text-muted-foreground">
                JobJet and its content, features, and functionality are owned by us and protected by copyright, 
                trademark, and other intellectual property laws.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Your Rights</h4>
              <p className="text-sm text-muted-foreground">
                You retain ownership of content you submit to our platform. By submitting content, you grant us 
                a license to use, display, and distribute it in connection with our services.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Privacy and Data */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Privacy and Data Protection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your privacy is important to us. Our collection and use of personal information is governed by our 
              Privacy Policy, which is incorporated into these terms by reference.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Data Collection</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>We collect information you provide</li>
                  <li>We may collect usage data</li>
                  <li>We use cookies and similar technologies</li>
                  <li>We protect your data with security measures</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Data Usage</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>To provide our services</li>
                  <li>To improve our platform</li>
                  <li>To communicate with you</li>
                  <li>To ensure platform security</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Disclaimers and Limitations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Service Availability</h4>
              <p className="text-sm text-muted-foreground">
                We strive to provide reliable service but cannot guarantee uninterrupted access. We may modify, 
                suspend, or discontinue services at any time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Content Accuracy</h4>
              <p className="text-sm text-muted-foreground">
                We do not verify the accuracy of job postings or user content. Users are responsible for 
                the information they provide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Limitation of Liability</h4>
              <p className="text-sm text-muted-foreground">
                To the maximum extent permitted by law, JobJet shall not be liable for any indirect, 
                incidental, or consequential damages.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Account Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Your Right to Terminate</h4>
              <p className="text-sm text-muted-foreground">
                You may terminate your account at any time by contacting us or using the account deletion 
                feature in your profile settings.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Our Right to Terminate</h4>
              <p className="text-sm text-muted-foreground">
                We may terminate or suspend your account if you violate these terms, engage in fraudulent 
                activity, or for other legitimate business reasons.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Effect of Termination</h4>
              <p className="text-sm text-muted-foreground">
                Upon termination, your access to the platform will cease, and we may delete your account 
                and data in accordance with our data retention policies.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Governing Law and Disputes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Governing Law</h4>
              <p className="text-sm text-muted-foreground">
                These terms are governed by the laws of the jurisdiction where JobJet is incorporated, 
                without regard to conflict of law principles.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Dispute Resolution</h4>
              <p className="text-sm text-muted-foreground">
                Any disputes arising from these terms will be resolved through binding arbitration 
                in accordance with our dispute resolution procedures.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              If you have questions about these terms or need to report violations, please contact us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> legal@jobjet.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Innovation Drive, Tech City, TC 12345</p>
            </div>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We may update these terms from time to time. We will notify you of any material changes 
              by posting the new terms on this page and updating the "Last updated" date. Your continued 
              use of our platform after changes become effective constitutes acceptance of the new terms.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
