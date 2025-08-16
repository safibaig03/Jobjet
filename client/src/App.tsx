import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import JobDetails from "@/pages/job-details";
import CompanyDashboard from "@/pages/company-dashboard";
import PostJob from "@/pages/post-job";
import JobListings from "@/pages/job-listings";
import Applications from "@/pages/applications";
import Resources from "@/pages/resources";
import Companies from "@/pages/companies";
import Profile from "@/pages/profile";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Pricing from "@/pages/pricing";
import Blog from "@/pages/blog";
import Press from "@/pages/press";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Cookies from "@/pages/cookies";
import AccessibilityPage from "@/pages/accessibility";
import JobAlerts from "@/pages/job-alerts";
import RecruitingSolutions from "@/pages/recruiting-solutions";
import ForgotPassword from "@/pages/forgot-password";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "@/hooks/use-auth";
import { ThemeProvider } from "@/hooks/use-theme";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-64px-200px)]">{children}</main>
      <Footer />
    </>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/jobs" component={JobListings} />
        <Route path="/job/:id" component={JobDetails} />
        <Route path="/companies" component={Companies} />
        <Route path="/resources" component={Resources} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/blog" component={Blog} />
        <Route path="/press" component={Press} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/cookies" component={Cookies} />
        <Route path="/accessibility" component={AccessibilityPage} />
        <Route path="/job-alerts" component={JobAlerts} />
        <Route path="/recruiting-solutions" component={RecruitingSolutions} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/dashboard" component={CompanyDashboard} roles={["company"]} />
        <ProtectedRoute path="/post-job" component={PostJob} roles={["company"]} />
        <ProtectedRoute path="/applications" component={Applications} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="jobboard-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
