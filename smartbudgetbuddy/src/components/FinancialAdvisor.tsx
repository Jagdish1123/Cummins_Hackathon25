
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb, LineChart, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinancialAdvice {
  id: string;
  type: "tip" | "alert" | "insight" | "trend";
  content: string;
}

interface FinancialAdvisorProps {
  advice: FinancialAdvice[];
}

const FinancialAdvisor: React.FC<FinancialAdvisorProps> = ({ advice }) => {
  // Function to get the appropriate icon for the advice type
  const getAdviceIcon = (type: string) => {
    switch (type) {
      case "tip":
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "insight":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "trend":
        return <LineChart className="h-5 w-5 text-purple-500" />;
      default:
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
    }
  };

  // Function to get the appropriate badge color for the advice type
  const getAdviceBadgeClass = (type: string) => {
    switch (type) {
      case "tip":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "alert":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "insight":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "trend":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-indigo-100 to-blue-50 p-4 rounded-lg shadow-sm mb-4">
        <div className="flex items-center mb-3">
          <div className="bg-indigo-100 p-2 rounded-full mr-3">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
          </div>
          <h3 className="text-lg font-medium text-indigo-900">AI Financial Assistant</h3>
        </div>
        <p className="text-indigo-700 text-sm">
          Based on your spending patterns and financial goals, here are some personalized insights and recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {advice.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow bg-white">
            <div className="flex space-x-3 p-4">
              <div className="flex-shrink-0">
                <div className={cn(
                  "p-2 rounded-full",
                  item.type === "tip" ? "bg-yellow-50" : 
                  item.type === "alert" ? "bg-red-50" : 
                  item.type === "insight" ? "bg-blue-50" : 
                  "bg-purple-50"
                )}>
                  {getAdviceIcon(item.type)}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <Badge className={cn("mb-2", getAdviceBadgeClass(item.type))}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Badge>
                </div>
                <p className="text-gray-700">{item.content}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Market Trends Section */}
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-md font-medium">Market Trends</h4>
            <Badge variant="outline" className="text-xs">
              Updated just now
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm font-medium">Sensex</span>
              <div className="flex items-center space-x-1">
                <span className="text-green-600 font-medium">72,456.90</span>
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">+1.2%</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm font-medium">Nifty 50</span>
              <div className="flex items-center space-x-1">
                <span className="text-green-600 font-medium">22,056.30</span>
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">+0.9%</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm font-medium">Bank Nifty</span>
              <div className="flex items-center space-x-1">
                <span className="text-red-600 font-medium">47,235.10</span>
                <TrendingDown className="h-3 w-3 text-red-600" />
                <span className="text-xs text-red-600">-0.3%</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium">IT Index</span>
              <div className="flex items-center space-x-1">
                <span className="text-green-600 font-medium">36,780.45</span>
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600">+1.5%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialAdvisor;
