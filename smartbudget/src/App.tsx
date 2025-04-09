import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as SonnerToaster } from "sonner";

import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Expenses from "@/pages/Expenses";
import Groups from "@/pages/Groups";
import FinancialAdvisor from "@/pages/FinancialAdvisor";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import LandingPage from "@/pages/LandingPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="smartbudget-theme">
        <LanguageProvider>
          <AuthProvider>
            <NotificationProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/expenses"
                    element={
                      <ProtectedRoute>
                        <Expenses />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/groups"
                    element={
                      <ProtectedRoute>
                        <Groups />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/advisor"
                    element={
                      <ProtectedRoute>
                        <FinancialAdvisor />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />

                  {/* Redirect /cards to /expenses */}
                  <Route
                    path="/cards"
                    element={<Navigate to="/expenses" replace />}
                  />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
              <SonnerToaster position="bottom-right" />
              <Toaster />
            </NotificationProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
