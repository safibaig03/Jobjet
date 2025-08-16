import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

// Extended user type with company information
type ExtendedUser = {
  id: number;
  username: string;
  password: string;
  email: string;
  role: "job_seeker" | "company" | "admin";
  name: string;
  createdAt: Date | null;
  company?: string;
  companyWebsite?: string;
  companyLogo?: string;
  companyDescription?: string;
  companyLocation?: string;
};
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Edit, Save, X, User, Mail, Building } from "lucide-react";

export default function Profile() {
  const { user, isCompany, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const extendedUser = user as ExtendedUser;
  const [formData, setFormData] = useState({
    name: extendedUser?.name || "",
    email: extendedUser?.email || "",
    company: extendedUser?.company || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = () => {
    // TODO: Implement profile update logic
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: extendedUser?.name || "",
      email: extendedUser?.email || "",
      company: extendedUser?.company || "",
    });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    // TODO: Implement password change logic
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("New password must be at least 6 characters long!");
      return;
    }
    
    console.log("Changing password:", passwordData);
    setShowChangePassword(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    // TODO: Call API to change password
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") {
      alert("Please type DELETE to confirm account deletion");
      return;
    }
    
    setIsDeleting(true);
    
    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
        credentials: "include",
      });
      
      if (response.ok) {
        // Show success message
        toast({
          title: "Account Deleted",
          description: "Your account has been deleted successfully. You will be redirected to the home page.",
        });
        
        // Clear user data and redirect to home
        logoutMutation.mutate();
        setLocation("/");
      } else {
        const errorData = await response.json();
        toast({
          title: "Delete Failed",
          description: "Failed to delete account. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete account. Please try again.",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteAccount(false);
      setDeleteConfirm("");
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Please log in to view your profile</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and preferences</CardDescription>
              </div>
              <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" alt={user.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <div className="flex items-center space-x-2">
                  <Badge variant={isCompany ? "default" : "secondary"}>
                    {isCompany ? "Company" : "Job Seeker"}
                  </Badge>
                  {extendedUser.company && (
                    <Badge variant="outline">{extendedUser.company}</Badge>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Full Name</span>
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground py-2">{user.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Address</span>
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground py-2">{user.email}</p>
                )}
              </div>

              {isCompany && (
                <div className="space-y-2">
                  <Label htmlFor="company" className="flex items-center space-x-2">
                    <Building className="h-4 w-4" />
                    <span>Company Name</span>
                  </Label>
                  {isEditing ? (
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Enter company name"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground py-2">{extendedUser.company || "Not specified"}</p>
                  )}
                </div>
              )}
            </div>

            {/* Save/Cancel Buttons */}
            {isEditing && (
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>Manage your account and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-muted-foreground">Update your account password</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowChangePassword(true)}
              >
                Change Password
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button 
                variant="destructive" 
                onClick={() => setShowDeleteAccount(true)}
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Change Password Dialog */}
        {showChangePassword && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowChangePassword(false)}
          >
            <div 
              className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowChangePassword(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleChangePassword}>
                    Change Password
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Account Dialog */}
        {showDeleteAccount && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowDeleteAccount(false)}
          >
            <div 
              className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4 text-destructive">Delete Account</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="deleteConfirm">Type "DELETE" to confirm</Label>
                  <Input
                    id="deleteConfirm"
                    value={deleteConfirm}
                    onChange={(e) => setDeleteConfirm(e.target.value)}
                    placeholder="Type DELETE to confirm"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowDeleteAccount(false)}>
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirm !== "DELETE" || isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete Account"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
