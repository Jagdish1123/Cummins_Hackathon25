
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/LoginForm";
import { MoveRight, LightbulbIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between bg-primary/10 dark:bg-primary/5 p-10">
        <div className="flex items-center space-x-2">
          <LightbulbIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">SmartBudget</span>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Smart Budget, Smarter You!</h1>
          <p className="text-lg text-muted-foreground">
            Take control of your finances with intelligent expense tracking, 
            automated budgeting, and smart insights tailored to your spending habits.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">1</div>
              <div>
                <h3 className="font-medium">Effortless Expense Tracking</h3>
                <p className="text-sm text-muted-foreground">Log expenses quickly with AI-powered categorization</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">2</div>
              <div>
                <h3 className="font-medium">Smart Group Expenses</h3>
                <p className="text-sm text-muted-foreground">Split bills easily and track who owes what</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">3</div>
              <div>
                <h3 className="font-medium">Financial Insights</h3>
                <p className="text-sm text-muted-foreground">Get personalized recommendations from our AI advisor</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">New to SmartBudget?</p>
          <Button variant="link" className="p-0" asChild>
            <Link to="/signup" className="flex items-center space-x-1">
              <span>Create an account</span>
              <MoveRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:hidden">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <LightbulbIcon className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SmartBudget</span>
            </div>
            <h1 className="text-2xl font-bold">Smart Budget, Smarter You!</h1>
            <p className="text-muted-foreground">Sign in to continue</p>
          </div>
          
          <LoginForm />
          
          <div className="text-center md:hidden">
            <p className="text-sm text-muted-foreground mb-2">New to SmartBudget?</p>
            <Button variant="outline" asChild className="w-full">
              <Link to="/signup">Create an account</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
