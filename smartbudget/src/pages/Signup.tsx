
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SignupForm } from "@/components/SignupForm";
import { MoveRight, LightbulbIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Signup = () => {
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
          <h1 className="text-4xl font-bold">Join SmartBudget Today</h1>
          <p className="text-lg text-muted-foreground">
            Create an account to start managing your finances more intelligently 
            with personalized budgeting, expense tracking, and smart insights.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-medium">For Students</h3>
              <p className="text-sm text-muted-foreground">
                Manage your limited student budget, track group expenses with roommates, 
                and build good financial habits early.
              </p>
            </div>
            
            <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-medium">For Professionals</h3>
              <p className="text-sm text-muted-foreground">
                Track work expenses, manage investments, and get insights on 
                optimizing your spending and saving patterns.
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Already have an account?</p>
          <Button variant="link" className="p-0" asChild>
            <Link to="/login" className="flex items-center space-x-1">
              <span>Sign in</span>
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
            <h1 className="text-2xl font-bold">Create Your Account</h1>
            <p className="text-muted-foreground">Join SmartBudget to get started</p>
          </div>
          
          <SignupForm />
          
          <div className="text-center md:hidden">
            <p className="text-sm text-muted-foreground mb-2">Already have an account?</p>
            <Button variant="outline" asChild className="w-full">
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
