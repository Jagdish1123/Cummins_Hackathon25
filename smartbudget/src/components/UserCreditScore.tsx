
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Star, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function UserCreditScore() {
  const { user } = useAuth();
  const creditScore = user?.creditScore || 0;

  const getCreditRating = (score: number) => {
    if (score >= 90) return { rating: "Excellent", color: "text-green-500" };
    if (score >= 80) return { rating: "Very Good", color: "text-emerald-500" };
    if (score >= 70) return { rating: "Good", color: "text-blue-500" };
    if (score >= 60) return { rating: "Fair", color: "text-amber-500" };
    if (score >= 50) return { rating: "Poor", color: "text-orange-500" };
    return { rating: "Very Poor", color: "text-red-500" };
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-emerald-500";
    if (score >= 70) return "bg-blue-500";
    if (score >= 60) return "bg-amber-500";
    if (score >= 50) return "bg-orange-500";
    return "bg-red-500";
  };

  const { rating, color } = getCreditRating(creditScore);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Reliability Score</CardTitle>
            <CardDescription>Your group payment reliability rating</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground">
                  <HelpCircle className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">
                  Your reliability score reflects how timely you are with group payments. 
                  Higher scores make you more trusted for future group expenses.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-500 mr-1 fill-yellow-500" />
            <span className="text-2xl font-bold">{creditScore}</span>
            <span className={`text-sm ml-1.5 ${color}`}>{rating}</span>
          </div>
          <div className="text-xs text-muted-foreground">out of 100</div>
        </div>
        
        <Progress value={creditScore} className="h-2" />
        <div className={`h-2 w-full rounded-full overflow-hidden mt-[-8px]`}>
          <div 
            className={`h-full ${getProgressColor(creditScore)}`} 
            style={{ width: `${creditScore}%` }}
          ></div>
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-start space-x-2">
            <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">On-time Payments</p>
              <p className="text-xs text-muted-foreground">
                You've made 16 out of 18 payments on time.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">How to Improve</p>
              <p className="text-xs text-muted-foreground">
                Pay outstanding group expenses promptly to increase your score.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
