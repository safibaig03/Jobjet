import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accessibility as AccessibilityIcon, Eye, Ear, Hand, Brain, Settings } from "lucide-react";

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Accessibility Statement
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            JobJet is committed to ensuring digital accessibility for people with disabilities. 
            We are continually improving the user experience for everyone.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Last updated: January 15, 2024
          </div>
        </div>

        {/* Commitment */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                              <AccessibilityIcon className="h-5 w-5 text-primary" />
              Our Commitment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              JobJet believes that digital accessibility is a fundamental human right. We are committed to:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>Making our platform accessible to people with disabilities</li>
              <li>Following WCAG 2.1 AA standards for web accessibility</li>
              <li>Continuously improving accessibility features</li>
              <li>Providing alternative ways to access information</li>
              <li>Training our team on accessibility best practices</li>
            </ul>
          </CardContent>
        </Card>

        {/* Standards */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Accessibility Standards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Our platform strives to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. 
              These guidelines explain how to make web content more accessible for people with disabilities.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">WCAG 2.1 AA Compliance</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Perceivable - Information is presented in ways users can perceive</li>
                  <li>Operable - Interface components are operable by all users</li>
                  <li>Understandable - Information and operation are understandable</li>
                  <li>Robust - Content can be interpreted by assistive technologies</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Additional Standards</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Section 508 compliance for federal accessibility</li>
                  <li>ADA Title III requirements</li>
                  <li>EN 301 549 European accessibility standards</li>
                  <li>Industry best practices for inclusive design</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Accessibility Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-purple-500" />
                  Visual Accessibility
                </h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>High contrast color schemes</li>
                  <li>Adjustable font sizes</li>
                  <li>Clear typography and spacing</li>
                  <li>Alternative text for images</li>
                  <li>Focus indicators for navigation</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Ear className="h-4 w-4 text-green-500" />
                  Audio Accessibility
                </h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Screen reader compatibility</li>
                  <li>Audio descriptions for videos</li>
                  <li>Captions and transcripts</li>
                  <li>Volume controls</li>
                  <li>Audio alerts and notifications</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Hand className="h-4 w-4 text-purple-500" />
                  Motor Accessibility
                </h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Keyboard navigation support</li>
                  <li>Voice control compatibility</li>
                  <li>Large click targets</li>
                  <li>Customizable timeouts</li>
                  <li>Alternative input methods</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Brain className="h-4 w-4 text-orange-500" />
                  Cognitive Accessibility
                </h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Clear and simple language</li>
                  <li>Consistent navigation patterns</li>
                  <li>Logical content structure</li>
                  <li>Error prevention and recovery</li>
                  <li>Multiple ways to complete tasks</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assistive Technologies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Assistive Technology Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Our platform is designed to work with a variety of assistive technologies:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Screen Readers</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>JAWS (Windows)</li>
                  <li>NVDA (Windows)</li>
                  <li>VoiceOver (macOS/iOS)</li>
                  <li>TalkBack (Android)</li>
                  <li>Orca (Linux)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Other Technologies</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Voice recognition software</li>
                  <li>Switch devices</li>
                  <li>Eye tracking systems</li>
                  <li>Magnification software</li>
                  <li>Braille displays</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testing and Evaluation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Testing and Evaluation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Automated Testing</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Lighthouse accessibility audits</li>
                  <li>axe-core testing framework</li>
                  <li>WAVE accessibility evaluation</li>
                  <li>Continuous integration checks</li>
                  <li>Regular automated scans</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Manual Testing</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Screen reader testing</li>
                  <li>Keyboard navigation testing</li>
                  <li>Color contrast verification</li>
                  <li>User experience testing</li>
                  <li>Accessibility expert reviews</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Known Issues */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Known Accessibility Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We are aware of some accessibility limitations and are working to address them:
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                  PDF Documents
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Some downloadable PDF documents may not be fully accessible. We're working to provide 
                  alternative formats and improve PDF accessibility.
                </p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                  Third-Party Content
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Content from third-party sources may not meet our accessibility standards. 
                  We're working with partners to improve this.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback and Support */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Feedback and Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We welcome your feedback on the accessibility of our platform. If you experience 
              accessibility barriers or have suggestions for improvement, please contact us:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Contact Methods</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Email: accessibility@jobjet.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Online feedback form</li>
                  <li>Support chat</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Response Time</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Initial response within 24 hours</li>
                  <li>Detailed investigation within 3 days</li>
                  <li>Regular updates on progress</li>
                  <li>Priority for critical issues</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continuous Improvement */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Continuous Improvement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Accessibility is an ongoing commitment. We regularly:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>Review and update our accessibility policies</li>
              <li>Train our development team on accessibility best practices</li>
              <li>Conduct accessibility audits and user testing</li>
              <li>Implement feedback from users with disabilities</li>
              <li>Stay updated on accessibility standards and guidelines</li>
              <li>Collaborate with accessibility experts and organizations</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Accessibility Team Contact</CardTitle>
            <CardDescription>
              For accessibility-specific inquiries and support, please contact our dedicated accessibility team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Accessibility Email:</strong> accessibility@jobjet.com</p>
              <p><strong>General Support:</strong> support@jobjet.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Innovation Drive, Tech City, TC 12345</p>
              <p><strong>Response Time:</strong> Within 24 hours for accessibility inquiries</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
