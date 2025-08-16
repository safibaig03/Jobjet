import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { insertUserSchema, User as SelectUser, InsertUser } from "@shared/schema";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: SelectUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<SelectUser, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<SelectUser, Error, InsertUser>;
  isCompany: boolean;
  isJobSeeker: boolean;
  isAdmin: boolean;
};

type LoginData = Pick<InsertUser, "username" | "password">;

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<SelectUser | null, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: (user: SelectUser) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      });
    },
    onError: (error: Error) => {
      // Extract user-friendly message from error
      let message = "Invalid username or password";
      if (error.message.includes("Invalid username or password")) {
        message = "Invalid username or password. Please check your credentials and try again.";
      } else if (error.message.includes("401:")) {
        // Extract message from JSON response
        try {
          const errorData = JSON.parse(error.message.split("401: ")[1]);
          if (errorData.message) {
            message = errorData.message;
          }
        } catch {
          message = "Login failed. Please try again.";
        }
      }
      
      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: InsertUser) => {
      const res = await apiRequest("POST", "/api/register", credentials);
      return await res.json();
    },
    onSuccess: (user: SelectUser) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Registration successful",
        description: `Welcome to JobBoard, ${user.name}!`,
      });
    },
    onError: (error: Error) => {
      // Extract user-friendly message from error
      let message = "Could not create account";
      if (error.message.includes("Username already exists")) {
        message = "Username already exists. Please choose a different username.";
      } else if (error.message.includes("Email already exists")) {
        message = "Email already exists. Please use a different email address.";
      } else if (error.message.includes("400:")) {
        // Extract message from JSON response
        try {
          const errorData = JSON.parse(error.message.split("400: ")[1]);
          if (errorData.message) {
            message = errorData.message;
          }
        } catch {
          message = "Could not create account. Please try again.";
        }
      }
      
      toast({
        title: "Registration failed",
        description: message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
      });
    },
  });

  // Helper flags for user role checks
  const isCompany = user?.role === 'company';
  const isJobSeeker = user?.role === 'job_seeker';
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
        isCompany,
        isJobSeeker,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
