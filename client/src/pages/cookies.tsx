import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cookie, Settings, Shield, Info, Eye } from "lucide-react";

export default function Cookies() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Cookie Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how JobJet uses cookies and similar technologies to enhance your experience on our platform.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Last updated: January 15, 2024
          </div>
        </div>

        {/* What Are Cookies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              What Are Cookies?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Cookies are small text files that are stored on your device when you visit our website. 
              They help us provide you with a better experience by:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>Remembering your preferences and settings</li>
              <li>Analyzing how you use our platform</li>
              <li>Providing personalized content and features</li>
              <li>Ensuring the security of your account</li>
              <li>Improving our services based on usage patterns</li>
            </ul>
          </CardContent>
        </Card>

        {/* Types of Cookies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Types of Cookies We Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  Essential Cookies
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  These cookies are necessary for the website to function properly.
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Authentication and security</li>
                  <li>Session management</li>
                  <li>Basic functionality</li>
                  <li>Cannot be disabled</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-purple-500" />
                  Functional Cookies
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  These cookies enhance your experience by remembering your preferences.
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Language preferences</li>
                  <li>Theme settings</li>
                  <li>Job search filters</li>
                  <li>Form auto-completion</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-purple-500" />
                  Analytics Cookies
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  These cookies help us understand how visitors use our platform.
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Page views and navigation</li>
                  <li>Feature usage statistics</li>
                  <li>Performance monitoring</li>
                  <li>User behavior analysis</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Info className="h-4 w-4 text-orange-500" />
                  Marketing Cookies
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  These cookies help us deliver relevant content and advertisements.
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Targeted job recommendations</li>
                  <li>Relevant company suggestions</li>
                  <li>Personalized content</li>
                  <li>Campaign effectiveness</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Specific Cookies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Specific Cookies We Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-semibold">Cookie Name</th>
                    <th className="text-left py-2 font-semibold">Purpose</th>
                    <th className="text-left py-2 font-semibold">Duration</th>
                    <th className="text-left py-2 font-semibold">Type</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b">
                    <td className="py-2 font-mono text-xs">session_id</td>
                    <td className="py-2">Maintains your login session</td>
                    <td className="py-2">Session</td>
                    <td className="py-2"><Badge variant="outline">Essential</Badge></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-mono text-xs">user_preferences</td>
                    <td className="py-2">Stores your settings and preferences</td>
                    <td className="py-2">1 year</td>
                    <td className="py-2"><Badge variant="outline">Functional</Badge></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-mono text-xs">analytics_id</td>
                    <td className="py-2">Tracks platform usage for improvements</td>
                    <td className="py-2">2 years</td>
                    <td className="py-2"><Badge variant="outline">Analytics</Badge></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-mono text-xs">marketing_tracker</td>
                    <td className="py-2">Delivers personalized job recommendations</td>
                    <td className="py-2">6 months</td>
                    <td className="py-2"><Badge variant="outline">Marketing</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Cookies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Third-Party Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Some cookies on our platform are set by third-party services that help us provide 
              better functionality and analytics:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Analytics Services</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Google Analytics - Website usage statistics</li>
                  <li>Hotjar - User behavior analysis</li>
                  <li>Mixpanel - Feature usage tracking</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Functional Services</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Stripe - Payment processing</li>
                  <li>SendGrid - Email delivery</li>
                  <li>Cloudflare - Security and performance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cookie Management */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Managing Your Cookie Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Browser Settings</h4>
              <p className="text-sm text-muted-foreground mb-2">
                You can control cookies through your browser settings:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
                <li>Firefox: Options → Privacy & Security → Cookies and Site Data</li>
                <li>Safari: Preferences → Privacy → Manage Website Data</li>
                <li>Edge: Settings → Cookies and site permissions → Cookies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Our Cookie Settings</h4>
              <p className="text-sm text-muted-foreground">
                You can also manage your cookie preferences through our platform settings. 
                Go to your profile settings to customize which types of cookies you allow.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Opt-Out Options</h4>
              <p className="text-sm text-muted-foreground">
                For third-party analytics and marketing cookies, you can opt out through 
                their respective opt-out mechanisms or contact us for assistance.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Impact of Disabling */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Impact of Disabling Cookies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-red-600">What You'll Lose</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Personalized job recommendations</li>
                  <li>Saved preferences and settings</li>
                  <li>Auto-completed forms</li>
                  <li>Seamless navigation experience</li>
                  <li>Targeted content and features</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-green-600">What Will Still Work</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Basic website functionality</li>
                  <li>Job searching and browsing</li>
                  <li>Account creation and login</li>
                  <li>Job applications</li>
                  <li>Core platform features</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Updates and Changes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Updates to This Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We may update this cookie policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons. We will notify you of any 
              material changes by posting the updated policy on this page and updating the "Last updated" date.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              If you have questions about our use of cookies or need help managing your preferences, 
              please contact us.
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
      </div>
    </div>
  );
}
