import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Languages,
  Moon,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [currency, setCurrency] = useState("INR");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSaveProfile = () => {
    toast.success(t("Profile updated successfully"));
  };

  const handleSaveNotifications = () => {
    toast.success(t("Notification preferences updated"));
  };

  const handleSaveSecurity = () => {
    toast.success(t("Security settings updated"));
  };

  const handleSavePayment = () => {
    toast.success(t("Payment methods updated"));
  };

  const handleSaveAppearance = () => {
    toast.success(t("Appearance settings updated"));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">{t("Settings")}</h1>
          <p className="text-muted-foreground">
            {t("Manage your account settings and preferences")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                {t("Profile")}
              </CardTitle>
              <CardDescription>
                {t("Manage your personal information")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("Name")}</Label>
                <Input id="name" defaultValue={user?.displayName || "User"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("Email")}</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email || "user@example.com"}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t("Phone")}</Label>
                <Input id="phone" type="tel" placeholder="+91 98765 43210" />
              </div>
              <Button onClick={handleSaveProfile}>{t("Save Changes")}</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                {t("Notifications")}
              </CardTitle>
              <CardDescription>
                {t("Configure how you receive notifications")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("Push Notifications")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("Receive notifications on your device")}
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("Email Notifications")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("Receive notifications via email")}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("Payment Reminders")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("Get reminded about upcoming payments")}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button onClick={handleSaveNotifications}>
                {t("Save Preferences")}
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                {t("Security")}
              </CardTitle>
              <CardDescription>
                {t("Manage your account security")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">
                  {t("Current Password")}
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">{t("New Password")}</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">
                  {t("Confirm Password")}
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("Two-Factor Authentication")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("Add an extra layer of security")}
                  </p>
                </div>
                <Switch />
              </div>
              <Button onClick={handleSaveSecurity}>
                {t("Update Security")}
              </Button>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                {t("Payment Methods")}
              </CardTitle>
              <CardDescription>
                {t("Manage your payment methods")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">{t("Default Currency")}</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select currency")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">₹ INR - Indian Rupee</SelectItem>
                    <SelectItem value="USD">$ USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">€ EUR - Euro</SelectItem>
                    <SelectItem value="GBP">£ GBP - British Pound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("Connected Payment Methods")}</Label>
                <div className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          {t("Credit Card")} •••• 4242
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t("Expires")} 12/25
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      {t("Remove")}
                    </Button>
                  </div>
                </div>
              </div>
              <Button onClick={handleSavePayment}>
                {t("Add Payment Method")}
              </Button>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Moon className="mr-2 h-5 w-5" />
                {t("Appearance")}
              </CardTitle>
              <CardDescription>
                {t("Customize how SmartBudget looks")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("Dark Mode")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("Switch between light and dark theme")}
                  </p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="language">{t("Language")}</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select language")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                    <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveAppearance}>
                {t("Save Preferences")}
              </Button>
            </CardContent>
          </Card>

          {/* Logout */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-destructive">
                <LogOut className="mr-2 h-5 w-5" />
                {t("Logout")}
              </CardTitle>
              <CardDescription>{t("Sign out of your account")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={handleLogout}>
                {t("Logout")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
