import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NotificationCenter } from "@/components/NotificationCenter";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Receipt,
  Users,
  BrainCircuit,
} from "lucide-react";
import { Logo } from "@/components/Logo";

const Navbar = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/dashboard">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/dashboard"
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent",
                location.pathname === "/dashboard" &&
                  "bg-accent text-accent-foreground"
              )}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              {t("dashboard")}
            </Link>
            <Link
              to="/expenses"
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent",
                location.pathname === "/expenses" &&
                  "bg-accent text-accent-foreground"
              )}
            >
              <Receipt className="mr-2 h-4 w-4" />
              {t("expenses")}
            </Link>
            <Link
              to="/groups"
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent",
                location.pathname === "/groups" &&
                  "bg-accent text-accent-foreground"
              )}
            >
              <Users className="mr-2 h-4 w-4" />
              {t("groups")}
            </Link>
            <Link
              to="/advisor"
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent",
                location.pathname === "/advisor" &&
                  "bg-accent text-accent-foreground"
              )}
            >
              <BrainCircuit className="mr-2 h-4 w-4" />
              {t("advisor")}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <NotificationCenter />
          <LanguageSelector />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user?.displayName || "User"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t("settings")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t("logout")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-2">
            <nav className="flex flex-col">
              <Link
                to="/dashboard"
                className={cn(
                  "flex items-center px-4 py-3 hover:bg-accent",
                  location.pathname === "/dashboard" &&
                    "bg-accent font-medium text-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                {t("dashboard")}
              </Link>
              <Link
                to="/expenses"
                className={cn(
                  "flex items-center px-4 py-3 hover:bg-accent",
                  location.pathname === "/expenses" &&
                    "bg-accent font-medium text-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Receipt className="mr-2 h-4 w-4" />
                {t("expenses")}
              </Link>
              <Link
                to="/groups"
                className={cn(
                  "flex items-center px-4 py-3 hover:bg-accent",
                  location.pathname === "/groups" &&
                    "bg-accent font-medium text-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Users className="mr-2 h-4 w-4" />
                {t("groups")}
              </Link>
              <Link
                to="/advisor"
                className={cn(
                  "flex items-center px-4 py-3 hover:bg-accent",
                  location.pathname === "/advisor" &&
                    "bg-accent font-medium text-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BrainCircuit className="mr-2 h-4 w-4" />
                {t("advisor")}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
