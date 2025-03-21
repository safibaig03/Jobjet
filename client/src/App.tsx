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
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "@/hooks/use-auth";
import { ThemeProvider } from "@/hooks/use-theme";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/jobs" component={JobListings} />
      <Route path="/job/:id" component={JobDetails} />
      <ProtectedRoute path="/dashboard" component={CompanyDashboard} roles={["company"]} />
      <ProtectedRoute path="/post-job" component={PostJob} roles={["company"]} />
      <ProtectedRoute path="/applications" component={Applications} />
      <Route component={NotFound} />
    </Switch>
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
