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
  Check,
  IndianRupee, 
  Users
} from "lucide-react";
import { GroupBadges } from "@/components/GroupBadges";
import { useAuth } from "@/contexts/AuthContext";
import { StockMarketDashboard } from "@/components/StockMarketDashboard";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  en: {
    accountSettings: "Account Settings",
    managePreferences: "Manage your account preferences and settings",
    profileInformation: "Profile Information",
    updateInfo: "Update your personal details and contact information",
    profilePhoto: "Profile Photo",
    displayedProfile: "This will be displayed on your profile",
    changePhoto: "Change Photo",
    remove: "Remove",
    fullName: "Full Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    bio: "Bio",
    bioDesc: "Brief description for your profile.",
    saveChanges: "Save Changes",
    preferences: "Preferences",
    customizeExperience: "Customize your app experience",
    currency: "Currency",
    language: "Language",
    timezone: "Timezone",
    themeSettings: "Theme Settings",
    darkMode: "Dark Mode",
    useTheme: "Use dark theme throughout the app",
    compactView: "Compact View",
    reduceSpacing: "Reduce padding and spacing in the interface",
    savePreferences: "Save Preferences",
    notificationSettings: "Notification Settings",
    manageNotifications: "Manage how and when you receive notifications",
    appNotifications: "App Notifications",
    expenseReminders: "Expense Reminders",
    receiveReminders: "Receive reminders for upcoming recurring expenses",
    budgetAlerts: "Budget Alerts",
    budgetAlertsDesc: "Get notified when you're close to or exceeding budget limits",
    groupUpdates: "Group Updates",
    groupUpdatesDesc: "Receive notifications about group expenses and settlements",
    emailNotifications: "Email Notifications",
    monthlyReports: "Monthly Reports",
    monthlyReportsDesc: "Receive monthly summary of your expenses and budget status",
    weeklyDigest: "Weekly Digest",
    weeklyDigestDesc: "Get a weekly summary of your financial activities",
    marketingEmails: "Marketing Emails",
    marketingEmailsDesc: "Receive updates about new features and promotions",
    saveNotificationSettings: "Save Notification Settings",
    securitySettings: "Security Settings",
    managePassword: "Manage your account security and password",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
    updatePassword: "Update Password",
    twoFactorAuth: "Two-Factor Authentication",
    enableTwoFactor: "Enable Two-Factor Authentication",
    addSecurity: "Add an extra layer of security to your account",
    setup2FA: "Setup 2FA",
    sessions: "Sessions",
    currentSession: "Current Session",
    active: "Active",
    revoke: "Revoke",
    signOutDevices: "Sign Out All Other Devices",
    groupStats: "Group Statistics",
    yourGroupBadges: "Your Group Achievement Badges",
    investmentDashboard: "Investment Dashboard",
    trackStocks: "Track and monitor stock market trends",
  },
  mr: {
    accountSettings: "खाते सेटिंग्ज",
    managePreferences: "तुमच्या खाते प्राधान्ये आणि सेटिंग्ज व्यवस्थापित करा",
    profileInformation: "प्रोफाइल माहिती",
    updateInfo: "तुमची वैयक्तिक तपशील आणि संपर्क माहिती अपडेट करा",
    profilePhoto: "प्रोफाइल फोटो",
    displayedProfile: "हे तुमच्या प्रोफाइलवर प्रदर्शित केले जाईल",
    changePhoto: "फोटो बदला",
    remove: "काढा",
    fullName: "पूर्ण नाव",
    emailAddress: "ईमेल पत्ता",
    phoneNumber: "फोन नंबर",
    bio: "बायो",
    bioDesc: "तुमच्या प्रोफाइलसाठी संक्षिप्त वर्णन.",
    saveChanges: "बदल जतन करा",
    preferences: "प्राधान्ये",
    customizeExperience: "तुमचा अॅप अनुभव सानुकूलित करा",
    currency: "चलन",
    language: "भाषा",
    timezone: "वेळ क्षेत्र",
    themeSettings: "थीम सेटिंग्ज",
    darkMode: "डार्क मोड",
    useTheme: "संपूर्ण अॅपमध्ये डार्क थीम वापरा",
    compactView: "कॉम्पॅक्ट व्ह्यू",
    reduceSpacing: "इंटरफेसमध्ये पॅडिंग आणि स्पेसिंग कमी करा",
    savePreferences: "प्राधान्ये जतन करा",
    notificationSettings: "सूचना सेटिंग्ज",
    manageNotifications: "तुम्हाला सूचना कधी आणि कशा मिळतात ते व्यवस्थापित करा",
    appNotifications: "अॅप सूचना",
    expenseReminders: "खर्च रिमाइंडर्स",
    receiveReminders: "आगामी आवर्ती खर्चांसाठी रिमाइंडर्स प्राप्त करा",
    budgetAlerts: "बजेट अलर्ट्स",
    budgetAlertsDesc: "बजेट मर्यादेच्या जवळ किंवा ओलांडताना सूचित केले जा",
    groupUpdates: "गट अपडेट्स",
    groupUpdatesDesc: "गट खर्च आणि सेटलमेंट्सबद्दल सूचना प्राप्त करा",
    emailNotifications: "ईमेल सूचना",
    monthlyReports: "मासिक अहवाल",
    monthlyReportsDesc: "तुमच्या खर्च आणि बजेट स्थितीचा मासिक सारांश प्राप्त करा",
    weeklyDigest: "साप्ताहिक डायजेस्ट",
    weeklyDigestDesc: "तुमच्या आर्थिक क्रियाकलापांचा साप्ताहिक सारांश मिळवा",
    marketingEmails: "मार्केटिंग ईमेल्स",
    marketingEmailsDesc: "नवीन वैशिष्ट्ये आणि प्रमोशन्सबद्दल अ��डेट्स प्राप्त करा",
    saveNotificationSettings: "सूचना सेटिंग्ज जतन करा",
    securitySettings: "सुरक्षा सेटिंग्ज",
    managePassword: "तुमचे खाते सुरक्षा आणि पासवर्ड व्यवस्थापित करा",
    changePassword: "पासवर्ड बदला",
    currentPassword: "वर्तमान पासवर्ड",
    newPassword: "नवीन पासवर्ड",
    confirmPassword: "नवीन पासवर्ड पुष्टी करा",
    updatePassword: "पासवर्ड अपडेट करा",
    twoFactorAuth: "दोन-घटक प्रमाणीकरण",
    enableTwoFactor: "दोन-घटक प्रमाणीकरण सक्षम करा",
    addSecurity: "तुमच्या खात्यात सुरक्षेचा अतिरिक्त स्तर जोडा",
    setup2FA: "2FA सेटअप करा",
    sessions: "सेशन्स",
    currentSession: "वर्तमान सेशन",
    active: "सक्रिय",
    revoke: "रद्द करा",
    signOutDevices: "इतर सर्व डिव्हाइसेस मधून साइन आउट करा",
    groupStats: "गट आकडेवारी",
    yourGroupBadges: "तुमचे गट अचीव्हमेंट बॅजेस",
    investmentDashboard: "इन्वेस्टमेंट डॅशबोर्ड",
    trackStocks: "स्टॉक मार्केट ट्रेंड ट्रॅक आणि मॉनिटर करा",
  },
  hi: {
    accountSettings: "अकाउंट सेटिंग्स",
    managePreferences: "अपनी अकाउंट प्राथमिकताएं और सेटिंग्स प्रबंधित करें",
    profileInformation: "प्रोफाइल जानकारी",
    updateInfo: "अपने व्यक्तिगत विवरण और संपर्क जानकारी अपडेट करें",
    profilePhoto: "प्रोफाइल फोटो",
    displayedProfile: "यह आपकी प्रोफाइल पर प्रदर्शित किया जाएगा",
    changePhoto: "फोटो बदलें",
    remove: "हटाएं",
    fullName: "पूरा नाम",
    emailAddress: "ईमेल पता",
    phoneNumber: "फोन नंबर",
    bio: "बायो",
    bioDesc: "आपकी प्रोफाइल के लिए संक्षिप्त विवरण।",
    saveChanges: "परिवर्तन सहेजें",
    preferences: "प्राथमिकताएं",
    customizeExperience: "अपना ऐप अनुभव अनुकूलित करें",
    currency: "मुद्रा",
    language: "भाषा",
    timezone: "समय क्षेत्र",
    themeSettings: "थीम सेटिंग्स",
    darkMode: "डार्क मोड",
    useTheme: "पूरे ऐप में डार्क थीम का उपयोग करें",
    compactView: "कॉम्पैक्ट व्यू",
    reduceSpacing: "इंटरफेस में पैडिंग और स्पेसिंग कम करें",
    savePreferences: "प्राथमिकताएं सहेजें",
    notificationSettings: "नोटिफिकेशन सेटिंग्स",
    manageNotifications: "प्रबंधित करें कि आप नोटिफिकेशन कब और कैसे प्राप्त करते हैं",
    appNotifications: "ऐप नोटिफिकेशन",
    expenseReminders: "खर्च रिमाइंडर",
    receiveReminders: "आने वाले आवर्ती खर्चों के लिए रिमाइंडर प्राप्त करें",
    budgetAlerts: "बजट अलर्ट",
    budgetAlertsDesc: "बजट सीमा के करीब या उससे अधिक होने पर सूचित किया जाए",
    groupUpdates: "ग्रुप अपडेट",
    groupUpdatesDesc: "ग्रुप खर्चों और निपटान के बारे में नोटिफिकेशन प्राप्त करें",
    emailNotifications: "ईमेल नोटिफिकेशन",
    monthlyReports: "मासिक रिपोर्ट",
    monthlyReportsDesc: "अपने खर्चों और बजट स्थिति का मासिक सारांश प्राप्त करें",
    weeklyDigest: "साप्ताहिक डाइजेस्ट",
    weeklyDigestDesc: "अपनी वित्तीय गतिविधियों का साप्ताहिक सारांश प्राप्त करें",
    marketingEmails: "मार्केटिंग ईमेल",
    marketingEmailsDesc: "नई सुविधाओं और प्रमोशन के बारे में अपडेट प्राप्त करें",
    saveNotificationSettings: "नोटिफिकेशन सेटिंग्स सहेजें",
    securitySettings: "सुरक्षा सेटिंग्स",
    managePassword: "अपने अकाउंट की सुरक्षा और पासवर्ड प्रबंधित करें",
    changePassword: "पासवर्ड बदलें",
    currentPassword: "वर्तमान पासवर्ड",
    newPassword: "नया पासवर्ड",
    confirmPassword: "नए पासवर्ड की पुष्टि करें",
    updatePassword: "पासवर्ड अपडेट करें",
    twoFactorAuth: "दो-कारक प्रमाणीकरण",
    enableTwoFactor: "दो-कारक प्रमाणीकरण सक्षम करें",
    addSecurity: "अपने अकाउंट में सुरक्षा की एक अतिरिक्त परत जोड़ें",
    setup2FA: "2FA सेटअप करें",
    sessions: "सेशन",
    currentSession: "वर्तमान सेशन",
    active: "सक्रिय",
    revoke: "रद्द करें",
    signOutDevices: "अन्य सभी उपकरणों से साइन आउट करें",
    groupStats: "ग्रुप आंकड़े",
    yourGroupBadges: "आपके ग्रुप अचीवमेंट बैज",
    investmentDashboard: "निवेश डैशबोर्ड",
    trackStocks: "स्टॉक मार्केट ट्रेंड ट्रैक और मॉनिटर करें",
  }
};

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    currency: "INR",
    language: language,
    timezone: "Asia/Kolkata",
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

  const userGroupBadges = [
    { type: 'smart-spender' as const, score: 92 },
    { type: 'top-saver' as const, score: 85 },
    { type: 'efficiency-expert' as const, score: 78 }
  ];

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
    if (user) {
      updateProfile({
        name: profileForm.name,
      });
    }
    toast.success("Profile information updated successfully");
  };
  
  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">{t.accountSettings}</h1>
            <p className="text-muted-foreground">{t.managePreferences}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar Navigation */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Profile Summary */}
                <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl border shadow-subtle">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{user?.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{user?.email}</p>
                  <Button className="w-full" variant="outline">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t.signOutDevices}
                  </Button>
                </div>
                
                {/* Navigation Menu */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border shadow-subtle overflow-hidden">
                  <div className="p-2">
                    <Button variant="ghost" className="w-full justify-start mb-1">
                      <User className="mr-2 h-4 w-4" />
                      {t.profileInformation}
                    </Button>
               
                    <Button variant="ghost" className="w-full justify-start mb-1">
                      <Bell className="mr-2 h-4 w-4" />
                      {t.notificationSettings}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start mb-1">
                      <Shield className="mr-2 h-4 w-4" />
                      {t.securitySettings}
                    </Button>
               
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="space-y-8">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                  <TabsTrigger value="profile">{t.profileInformation}</TabsTrigger>
           
                  <TabsTrigger value="notifications">{t.notificationSettings}</TabsTrigger>
                  <TabsTrigger value="security">{t.securitySettings}</TabsTrigger>
  
                </TabsList>
                
                {/* Profile Information Tab */}
                <TabsContent value="profile" className="mt-6 space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.profileInformation}</CardTitle>
                      <CardDescription>{t.updateInfo}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium mb-1">{t.profilePhoto}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{t.displayedProfile}</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">{t.changePhoto}</Button>
                            <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">{t.remove}</Button>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t.fullName}</Label>
                          <Input
                            id="name"
                            name="name"
                            value={profileForm.name}
                            onChange={handleProfileChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">{t.emailAddress}</Label>
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
                          <Label htmlFor="phone">{t.phoneNumber}</Label>
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
                        <Label htmlFor="bio">{t.bio}</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          value={profileForm.bio}
                          onChange={handleProfileChange}
                          placeholder="Tell us a bit about yourself"
                        />
                        <p className="text-sm text-muted-foreground">{t.bioDesc}</p>
                      </div>
                      
                      <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        {t.saveChanges}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Preferences Tab */}
                <TabsContent value="preferences" className="mt-6 space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.preferences}</CardTitle>
                      <CardDescription>{t.customizeExperience}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="currency">{t.currency}</Label>
                          <div className="relative">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Select
                              value={profileForm.currency}
                              onValueChange={(value) => handleSelectChange("currency", value)}
                            >
                              <SelectTrigger id="currency" className="pl-10">
                                <SelectValue placeholder="Select Currency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="INR">Indian Rupee (INR)</SelectItem>
                                <SelectItem value="USD">US Dollar (USD)</SelectItem>
                                <SelectItem value="EUR">Euro (EUR)</SelectItem>
                                <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                                <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="language">{t.language}</Label>
                          <Select
                            value={profileForm.language}
                            onValueChange={(value) => {
                              handleSelectChange("language", value);
                              if (value === 'en' || value === 'mr' || value === 'hi') {
                                const { setLanguage } = useLanguage();
                                setLanguage(value);
                              }
                            }}
                          >
                            <SelectTrigger id="language">
                              <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                              <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="timezone">{t.timezone}</Label>
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
                                <SelectItem value="Asia/Kolkata">Indian Standard Time (IST)</SelectItem>
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
                        <h3 className="text-md font-medium">{t.themeSettings}</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="darkMode" className="block font-normal">{t.darkMode}</Label>
                            <p className="text-sm text-muted-foreground">{t.useTheme}</p>
                          </div>
                          <Switch id="darkMode" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="compactView" className="block font-normal">{t.compactView}</Label>
                            <p className="text-sm text-muted-foreground">{t.reduceSpacing}</p>
                          </div>
                          <Switch id="compactView" />
                        </div>
                      </div>
                      
                      <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        {t.savePreferences}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Notifications Tab */}
                <TabsContent value="notifications" className="mt-6 space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.notificationSettings}</CardTitle>
                      <CardDescription>{t.manageNotifications}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-md font-medium">{t.appNotifications}</h3>
                        
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="expenseReminders" className="block font-normal">{t.expenseReminders}</Label>
                            <p className="text-sm text-muted-foreground">{t.receiveReminders}</p>
                          </div>
                          <Switch 
                            id="expenseReminders" 
                            checked={notificationSettings.expenseReminders}
                            onCheckedChange={() => handleNotificationToggle("expenseReminders")}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="budgetAlerts" className="block font-normal">{t.budgetAlerts}</Label>
                            <p className="text-sm text-muted-foreground">{t.budgetAlertsDesc}</p>
                          </div>
                          <Switch 
                            id="budgetAlerts" 
                            checked={notificationSettings.budgetAlerts}
                            onCheckedChange={() => handleNotificationToggle("budgetAlerts")}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="groupUpdates" className="block font-normal">{t.groupUpdates}</Label>
                            <p className="text-sm text-muted-foreground">{t.groupUpdatesDesc}</p>
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
                        <h3 className="text-md font-medium">{t.emailNotifications}</h3>
                        
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="monthlyReports" className="block font-normal">{t.monthlyReports}</Label>
                            <p className="text-sm text-muted-foreground">{t.monthlyReportsDesc}</p>
                          </div>
                          <Switch 
                            id="monthlyReports" 
                            checked={notificationSettings.monthlyReports}
                            onCheckedChange={() => handleNotificationToggle("monthlyReports")}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="weeklyDigest" className="block font-normal">{t.weeklyDigest}</Label>
                            <p className="text-sm text-muted-foreground">{t.weeklyDigestDesc}</p>
                          </div>
                          <Switch 
                            id="weeklyDigest" 
                            checked={notificationSettings.weeklyDigest}
                            onCheckedChange={() => handleNotificationToggle("weeklyDigest")}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <Label htmlFor="marketingEmails" className="block font-normal">{t.marketingEmails}</Label>
                            <p className="text-sm text-muted-foreground">{t.marketingEmailsDesc}</p>
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
                        {t.saveNotificationSettings}
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Security Tab */}
                <TabsContent value="security" className="mt-6 space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.securitySettings}</CardTitle>
                      <CardDescription>{t.managePassword}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-md font-medium">{t.changePassword}</h3>
                        
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">{t.currentPassword}</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">{t.newPassword}</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        
                        <Button>{t.updatePassword}</Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-md font-medium">{t.twoFactorAuth}</h3>
                        
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <p className="font-normal">{t.enableTwoFactor}</p>
                            <p className="text-sm text-muted-foreground">{t.addSecurity}</p>
                          </div>
                          <Button variant="outline">{t.setup2FA}</Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-md font-medium">{t.sessions}</h3>
                        
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <Check className="h-5 w-5 text-green-500 mr-2" />
                                <span className="font-medium">{t.currentSession}</span>
                              </div>
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{t.active}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">Chrome on Windows</p>
                            <p className="text-xs text-muted-foreground">IP: 192.168.1.1 • Last accessed: 2 minutes ago</p>
                          </div>
                          
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">iPhone 12</span>
                              <Button variant="outline" size="sm" className="h-7 px-2">{t.revoke}</Button>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">Safari on iOS</p>
                            <p className="text-xs text-muted-foreground">IP: 172.16.254.1 • Last accessed: 3 days ago</p>
                          </div>
                        </div>
                        
                        <Button variant="outline" className="w-full text-red-500 hover:text-red-600">{t.signOutDevices}</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Group Stats Tab */}
                <TabsContent value="groups" className="mt-6 space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.groupStats}</CardTitle>
                      <CardDescription>{t.yourGroupBadges}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <GroupBadges badges={userGroupBadges} />
                        
                        <div className="mt-8 grid gap-6 md:grid-cols-2">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Monthly Savings</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold">₹12,540</span>
                                <Badge className="bg-green-100 text-green-800">+18% vs last month</Badge>
                              </div>
                              {/* Here we could add a chart component */}
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">Budget Adherence</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold">92%</span>
                                <Badge className="bg-green-100 text-green-800">Good</Badge>
                              </div>
                              {/* Here we could add a chart component */}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Investments Tab */}
                <TabsContent value="investments" className="mt-6 space-y-8">
                  <StockMarketDashboard />
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
