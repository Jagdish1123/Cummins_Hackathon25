import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationCenter } from "@/components/NotificationCenter";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  Receipt, 
  PiggyBank, 
  Users, 
  User, 
  Bell, 
  Menu,
  X,
  LogOut,
  Settings,
  LightbulbIcon,
  BarChart2,
  CreditCard,
  Globe,
} from "lucide-react";

// Create language context
import { useLanguage } from "@/contexts/LanguageContext";

const navItems = [
  { path: "/dashboard", name: "Dashboard", icon: LayoutDashboard },
  { path: "/expenses", name: "Expenses", icon: Receipt },
  { path: "/budget", name: "Budget", icon: PiggyBank },
  { path: "/groups", name: "Groups", icon: Users },
  { path: "/advisor", name: "Financial Advisor", icon: BarChart2 },
  { path: "/profile", name: "Profile", icon: User },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMobileMenu();
  };

  const isHomePage = location.pathname === "/";
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  if (isAuthPage) return null;

  const getTranslation = (key) => {
    const translations = {
      en: {
        dashboard: "Dashboard",
        expenses: "Expenses",
        budget: "Budget",
        groups: "Groups",
        advisor: "Financial Advisor",
        profile: "Profile",
        logout: "Log out",
        settings: "Settings",
        payments: "Payment Methods",
        login: "Login",
        getStarted: "Get Started",
        slogan: "Smart Budget, Smarter You!",
      },
      mr: {
        dashboard: "डॅशबोर्ड",
        expenses: "खर्च",
        budget: "अंदाजपत्रक",
        groups: "गट",
        advisor: "आर्थिक सल्लागार",
        profile: "प्रोफाइल",
        logout: "बाहेर पडा",
        settings: "सेटिंग्ज",
        payments: "पेमेंट पद्धती",
        login: "लॉगिन",
        getStarted: "सुरू करा",
        slogan: "स्मार्ट बजेट, स्मार्टर यू!",
      },
      hi: {
        dashboard: "डैशबोर्ड",
        expenses: "खर्च",
        budget: "बजट",
        groups: "समूह",
        advisor: "वित्तीय सलाहकार",
        profile: "प्रोफाइल",
        logout: "लॉगआउट",
        settings: "सेटिंग",
        payments: "भुगतान विधियाँ",
        login: "लॉगिन",
        getStarted: "शुरू करें",
        slogan: "स्मार्ट बजट, स्मार्टर यू!",
      }
    };
    
    return translations[language][key] || key;
  };

  const translatedNavItems = navItems.map(item => ({
    ...item,
    name: getTranslation(item.path.replace('/', '') || item.name.toLowerCase())
  }));

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled || !isHomePage
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={closeMobileMenu}
          >
            <LightbulbIcon className="h-6 w-6 text-primary" />
            <span className="text-primary font-bold text-xl">SmartBudget</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {isAuthenticated && !isHomePage && translatedNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname === item.path
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                )}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </Link>
            ))}
            
            {!isAuthenticated && isHomePage && (
              <>
                <Link to="/login">
                  <Button variant="outline" className="mr-2">
                    {getTranslation("login")}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button>{getTranslation("getStarted")}</Button>
                </Link>
              </>
            )}
            
            <div className="flex items-center space-x-1 ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage('en')}>
                    English {language === 'en' && '✓'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('mr')}>
                    मराठी (Marathi) {language === 'mr' && '✓'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('hi')}>
                    हिंदी (Hindi) {language === 'hi' && '✓'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <ThemeToggle />
              
              {isAuthenticated && (
                <>
                  <NotificationCenter />
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 ml-1">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        <div className="flex flex-col">
                          <span>{user?.name}</span>
                          <span className="text-xs text-muted-foreground">{user?.email}</span>
                          <span className="text-xs text-muted-foreground capitalize mt-1">
                            {user?.userType}
                          </span>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          {getTranslation("profile")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/profile/settings" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          {getTranslation("settings")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/profile/payments" className="cursor-pointer">
                          <CreditCard className="mr-2 h-4 w-4" />
                          {getTranslation("payments")}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        {getTranslation("logout")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </nav>

          <div className="flex items-center space-x-2 md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English {language === 'en' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('mr')}>
                  मराठी (Marathi) {language === 'mr' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('hi')}>
                  हिंदी (Hindi) {language === 'hi' && '✓'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <ThemeToggle />
            
            {isAuthenticated && <NotificationCenter />}
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 bg-background z-40 md:hidden transform transition-transform duration-300 ease-in-out pt-16",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="pt-4 px-4 pb-6 h-full overflow-y-auto">
          {isAuthenticated ? (
            <>
              <div className="flex items-center p-4 mb-4 bg-muted/50 rounded-lg">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-sm text-muted-foreground">{user?.email}</div>
                </div>
              </div>
              
              <nav className="flex flex-col space-y-1">
                {translatedNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors",
                      location.pathname === item.path
                        ? "text-primary bg-primary/10"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    )}
                    onClick={closeMobileMenu}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                ))}
                
                <Button
                  variant="ghost"
                  className="flex items-center justify-start px-4 py-3 h-auto text-base font-medium rounded-md text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  {getTranslation("logout")}
                </Button>
              </nav>
            </>
          ) : (
            <div className="flex flex-col space-y-4 p-4">
              <Link to="/login" onClick={closeMobileMenu}>
                <Button variant="outline" className="w-full">{getTranslation("login")}</Button>
              </Link>
              <Link to="/signup" onClick={closeMobileMenu}>
                <Button className="w-full">{getTranslation("getStarted")}</Button>
              </Link>
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t">
            <div className="flex items-center justify-center">
              <LightbulbIcon className="h-5 w-5 text-primary mr-2" />
              <p className="text-sm text-center italic">{getTranslation("slogan")}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
