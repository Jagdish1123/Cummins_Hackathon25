import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Logo } from "@/components/Logo";
import {
  PiggyBank,
  Users,
  LineChart,
  BrainCircuit,
  Shield,
  Smartphone,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const LandingPage = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // This will bypass the registration process and take the user directly to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold">SmartBudget</div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Link to="/login">
              <Button variant="ghost">{t("login")}</Button>
            </Link>
            <Button onClick={handleGetStarted}>{t("getStarted")}</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {t("Manage your finances with ease")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            {t(
              "SmartBudget helps you track expenses, split bills with friends, and get personalized financial advice."
            )}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="gap-2" onClick={handleGetStarted}>
              {t("getStarted")}
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Link to="/login">
              <Button size="lg" variant="outline">
                {t("login")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            {t("Key Features")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <PiggyBank className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t("Expense Tracking")}
              </h3>
              <p className="text-muted-foreground">
                {t(
                  "Easily track your daily expenses and categorize them for better financial management."
                )}
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("Group Expenses")}</h3>
              <p className="text-muted-foreground">
                {t(
                  "Split bills with friends and family for trips, dinners, or any shared expenses."
                )}
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t("Financial Insights")}
              </h3>
              <p className="text-muted-foreground">
                {t(
                  "Get visual reports and analytics to understand your spending patterns."
                )}
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BrainCircuit className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("AI Advisor")}</h3>
              <p className="text-muted-foreground">
                {t(
                  "Receive personalized financial advice and recommendations based on your spending habits."
                )}
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t("Secure & Private")}
              </h3>
              <p className="text-muted-foreground">
                {t(
                  "Your financial data is encrypted and securely stored with industry-standard protection."
                )}
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("Mobile Friendly")}</h3>
              <p className="text-muted-foreground">
                {t(
                  "Access your financial information on the go with our responsive design."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            {t("Ready to take control of your finances?")}
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-10">
            {t(
              "Join thousands of users who are already managing their money smarter with SmartBudget."
            )}
          </p>
          <Button size="lg" onClick={handleGetStarted}>
            {t("Start for Free")}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Logo className="h-6 w-6" />
              <span className="font-semibold">SmartBudget</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SmartBudget.{" "}
              {t("All rights reserved.")}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
