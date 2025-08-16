import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, Plus, Trash2, Edit, Search, MapPin, Briefcase } from "lucide-react";

export default function JobAlerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      name: "Software Developer",
      keywords: ["React", "TypeScript", "Full Stack"],
      location: "Remote",
      frequency: "Daily",
      active: true,
    },
    {
      id: 2,
      name: "Product Manager",
      keywords: ["Product", "Agile", "User Research"],
      location: "New York, NY",
      frequency: "Weekly",
      active: true,
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    name: "",
    keywords: "",
    location: "",
    frequency: "Daily",
  });

  const handleCreateAlert = () => {
    if (newAlert.name && newAlert.keywords) {
      const alert = {
        id: Date.now(),
        name: newAlert.name,
        keywords: newAlert.keywords.split(",").map(k => k.trim()),
        location: newAlert.location || "Anywhere",
        frequency: newAlert.frequency,
        active: true,
      };
      setAlerts([...alerts, alert]);
      setNewAlert({ name: "", keywords: "", location: "", frequency: "Daily" });
      setShowCreateForm(false);
    }
  };

  const toggleAlert = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Job Alerts
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest job opportunities that match your preferences. 
            Create custom alerts and never miss your dream job.
          </p>
        </div>

        {/* Create New Alert */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Create New Job Alert
            </CardTitle>
            <CardDescription>
              Set up personalized job notifications based on your criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showCreateForm ? (
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Alert
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="alert-name">Alert Name</Label>
                    <Input
                      id="alert-name"
                      placeholder="e.g., Software Developer"
                      value={newAlert.name}
                      onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="alert-location">Location</Label>
                    <Input
                      id="alert-location"
                      placeholder="e.g., Remote, New York, NY"
                      value={newAlert.location}
                      onChange={(e) => setNewAlert({ ...newAlert, location: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="alert-keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="alert-keywords"
                    placeholder="e.g., React, TypeScript, Full Stack"
                    value={newAlert.keywords}
                    onChange={(e) => setNewAlert({ ...newAlert, keywords: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="alert-frequency">Notification Frequency</Label>
                  <select
                    id="alert-frequency"
                    className="w-full px-3 py-2 border border-border rounded-md"
                    value={newAlert.frequency}
                    onChange={(e) => setNewAlert({ ...newAlert, frequency: e.target.value })}
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCreateAlert}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Alert
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Existing Alerts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Your Job Alerts</h2>
          <div className="grid gap-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{alert.name}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {alert.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {alert.frequency}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={alert.active}
                        onCheckedChange={() => toggleAlert(alert.id)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteAlert(alert.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {alert.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <strong>Status:</strong> {alert.active ? "Active" : "Inactive"}
                    {alert.active && (
                      <span className="ml-2 text-green-600">
                        • Receiving notifications
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            {alerts.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No job alerts created yet</p>
                  <p className="text-sm text-muted-foreground">
                    Create your first job alert to start receiving notifications
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Quick Search */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Job Search</CardTitle>
            <CardDescription>
              Search for jobs without creating an alert
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Job title, keywords, or company"
                className="flex-1"
              />
              <Input
                placeholder="Location"
                className="w-48"
              />
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search Jobs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
