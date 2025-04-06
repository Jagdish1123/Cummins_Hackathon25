
import { useState } from "react";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  CreditCard, 
  LogOut, 
  Save, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  Check 
} from "lucide-react";

const Profile = () => {
  const [profileForm, setProfileForm] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    currency: "USD",
    language: "en",
    timezone: "America/New_York",
    bio: "Finance enthusiast and budget planner. I love tracking expenses and finding ways to save.",
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    expenseReminders: true,
    budgetAlerts: true,
    groupUpdates: true,
    monthlyReports: true,
    weeklyDigest: false,
    marketingEmails: false,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings(prev => ({ 
      ...prev, 
      [setting]: !prev[setting as keyof typeof notificationSettings] 
    }));
  };
  
  const handleSaveProfile = () => {
    toast.success("Profile information updated successfully");
  };
  
  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and settings</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar Navigation */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Profile Summary */}
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl border shadow-subtle">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="Alex Johnson" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{profileForm.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{profileForm.email}</p>
                  <Button className="w-full" variant="outline">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
                
                {/* Navigation Menu */}
                <div className="bg-white rounded-xl border shadow-subtle overflow-hidden">
                  <div className="p-2">
                    <Button variant="ghost" className="w-full justify-start mb-1">
                      <User className="mr-2 h-4 w-4" />
                      Profile Information
                    </Button>
                    <Button variant="ghost" className="w-full justify-start mb-1">
                      <Settings className="mr-2 h-4 w-4" />
                      Preferences
                    </Button>
                    <Button variant="ghost" className="w-full justify-start mb-1">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                    <Button variant="ghost" className="w-full justify-start mb-1">
                      <Shield className="mr-2 h-4 w-4" />
                      Security
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payment Methods
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="space-y-8">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                
                {/* Profile Information Tab */}
                <TabsContent value="profile" className="mt-6 space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your personal details and contact information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="Alex Johnson" />
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium mb-1">Profile Photo</h3>
                          <p className="text-sm text-muted-foreground mb-2">This will be displayed on your profile</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Change Photo</Button>
                            <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">Remove</Button>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={profileForm.name}
                            onChange={handleProfileChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              className="pl-10"
                              value={profileForm.email}
                              onChange={handleProfileChange}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              className="pl-10"
                              value={profileForm.phone}
                              onChange={handleProfileChange}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          value={profileForm.bio}
                          onChange={handleProfileChange}
                          placeholder="Tell us a bit about yourself"
                        />
                        <p className="text-sm text-muted-foreground">Brief description for your profile.</p>
                      </div>
                      
                      <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Preferences Tab */}
                <TabsContent value="preferences" className="mt-6 space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferences</CardTitle>
                      <CardDescription>Customize your app experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="currency">Currency</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Select
                              value={profileForm.currency}
                              onValueChange={(value) => handleSelectChange("currency", value)}
                            >
                              <SelectTrigger id="currency" className="pl-10">
                                <SelectValue placeholder="Select Currency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USD">US Dollar (USD)</SelectItem>
                                <SelectItem value="EUR">Euro (EUR)</SelectItem>
                                <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                                <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
                                <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <Select
                            value={profileForm.language}
                            onValueChange={(value) => handleSelectChange("language", value)}
                          >
                            <SelectTrigger id="language">
                              <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                              <SelectItem value="ja">Japanese</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Select
                              value={profileForm.timezone}
                              onValueChange={(value) => handleSelectChange("timezone", value)}
                            >
                              <SelectTrigger id="timezone" className="pl-10">
                                <SelectValue placeholder="Select Timezone" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                                <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                                <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                                <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3">
                        <h3 className="text-md font-medium">Theme Settings</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="darkMode" className="block font-normal">Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">Use dark theme throughout the app</p>
                          </div>
                          <Switch id="darkMode" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="compactView" className="block font-normal">Compact View</Label>
                            <p className="text-sm text-muted-foreground">Reduce padding and spacing in the interface</p>
                          </div>
                          <Switch id="compactView" />
                        </div>
                      </div>
                      
                      <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Preferences
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Notifications Tab */}
                <TabsContent value="notifications" className="mt-6 space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription>Manage how and when you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-md font-medium">App Notifications</h3>
                        
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="expenseReminders" className="block font-normal">Expense Reminders</Label>
                            <p className="text-sm text-muted-foreground">Receive reminders for upcoming recurring expenses</p>
                          </div>
                          <Switch 
                            id="expenseReminders" 
                            checked={notificationSettings.expenseReminders}
                            onCheckedChange={() => handleNotificationToggle("expenseReminders")}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="budgetAlerts" className="block font-normal">Budget Alerts</Label>
                            <p className="text-sm text-muted-foreground">Get notified when you're close to or exceeding budget limits</p>
                          </div>
                          <Switch 
                            id="budgetAlerts" 
                            checked={notificationSettings.budgetAlerts}
                            onCheckedChange={() => handleNotificationToggle("budgetAlerts")}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="groupUpdates" className="block font-normal">Group Updates</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications about group expenses and settlements</p>
                          </div>
                          <Switch 
                            id="groupUpdates" 
                            checked={notificationSettings.groupUpdates}
                            onCheckedChange={() => handleNotificationToggle("groupUpdates")}
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-md font-medium">Email Notifications</h3>
                        
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="monthlyReports" className="block font-normal">Monthly Reports</Label>
                            <p className="text-sm text-muted-foreground">Receive monthly summary of your expenses and budget status</p>
                          </div>
                          <Switch 
                            id="monthlyReports" 
                            checked={notificationSettings.monthlyReports}
                            onCheckedChange={() => handleNotificationToggle("monthlyReports")}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="weeklyDigest" className="block font-normal">Weekly Digest</Label>
                            <p className="text-sm text-muted-foreground">Get a weekly summary of your financial activities</p>
                          </div>
                          <Switch 
                            id="weeklyDigest" 
                            checked={notificationSettings.weeklyDigest}
                            onCheckedChange={() => handleNotificationToggle("weeklyDigest")}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="marketingEmails" className="block font-normal">Marketing Emails</Label>
                            <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                          </div>
                          <Switch 
                            id="marketingEmails" 
                            checked={notificationSettings.marketingEmails}
                            onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                          />
                        </div>
                      </div>
                      
                      <Button onClick={handleSaveNotifications}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Notification Settings
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Security Tab */}
                <TabsContent value="security" className="mt-6 space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Manage your account security and password</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-md font-medium">Change Password</h3>
                        
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        
                        <Button>Update Password</Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-md font-medium">Two-Factor Authentication</h3>
                        
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <p className="font-normal">Enable Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                          </div>
                          <Button variant="outline">Setup 2FA</Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-md font-medium">Sessions</h3>
                        
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <Check className="h-5 w-5 text-green-500 mr-2" />
                                <span className="font-medium">Current Session</span>
                              </div>
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">Chrome on Windows</p>
                            <p className="text-xs text-muted-foreground">IP: 192.168.1.1 • Last accessed: 2 minutes ago</p>
                          </div>
                          
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">iPhone 12</span>
                              <Button variant="outline" size="sm" className="h-7 px-2">Revoke</Button>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">Safari on iOS</p>
                            <p className="text-xs text-muted-foreground">IP: 172.16.254.1 • Last accessed: 3 days ago</p>
                          </div>
                        </div>
                        
                        <Button variant="outline" className="w-full text-red-500 hover:text-red-600">Sign Out All Other Devices</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
