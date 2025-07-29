
import Navbar from "@/components/Navbar";
import { FinancialAdvisorBot } from "@/components/FinancialAdvisorBot";
import { UserCreditScore } from "@/components/UserCreditScore";
import { PaymentIntegration } from "@/components/PaymentIntegration";
import { CustomCategoriesManager } from "@/components/CustomCategoriesManager";
import { SmartExpenseCapture } from "@/components/SmartExpenseCapture";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, BarChart2, BrainCircuit, Coins, CreditCard, LayoutDashboard, ScrollText } from "lucide-react";

const FinancialAdvisor = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center">
              <BrainCircuit className="h-8 w-8 text-primary mr-3" />
              <div>
                <h1 className="text-2xl font-bold">Financial Advisor</h1>
                <p className="text-muted-foreground">Get personalized financial insights and advice</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="advisor" className="space-y-6">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="advisor" className="flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Advisor
                  </TabsTrigger>
                  <TabsTrigger value="tools" className="flex items-center">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Smart Tools
                  </TabsTrigger>
                  <TabsTrigger value="insights" className="flex items-center">
                    <ScrollText className="h-4 w-4 mr-2" />
                    Insights
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="advisor" className="space-y-6">
                  <div>
                    <FinancialAdvisorBot />
                  </div>
                </TabsContent>
                
                <TabsContent value="tools" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SmartExpenseCapture />
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Budget Optimizer</CardTitle>
                        <CardDescription>
                          AI-powered budget recommendations based on your spending habits
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 bg-muted rounded-md">
                            <div className="flex items-start space-x-3">
                              <BarChart className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h3 className="font-medium">Budget Optimization</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Based on your spending patterns, we recommend reducing your dining budget by 15% and increasing your savings allocation.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-muted rounded-md">
                            <div className="flex items-start space-x-3">
                              <Coins className="h-5 w-5 text-amber-500 mt-0.5" />
                              <div>
                                <h3 className="font-medium">Savings Opportunity</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  You could save approximately $120/month by consolidating your subscription services.
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-muted rounded-md">
                            <div className="flex items-start space-x-3">
                              <CreditCard className="h-5 w-5 text-blue-500 mt-0.5" />
                              <div>
                                <h3 className="font-medium">Payment Efficiency</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Using your rewards credit card for utility payments could earn you an additional 2,500 points annually.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <CustomCategoriesManager />
                </TabsContent>
                
                <TabsContent value="insights" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Spending Analysis</CardTitle>
                      <CardDescription>
                        AI-generated insights about your spending habits
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-4 border rounded-md">
                        <h3 className="text-lg font-medium mb-2">Monthly Overview</h3>
                        <p className="text-muted-foreground mb-4">
                          Your spending this month is 12% higher than your 6-month average, primarily due to increased entertainment expenses.
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Food</p>
                            <p className="text-lg font-bold">$485</p>
                            <p className="text-xs text-red-500">+8%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Entertainment</p>
                            <p className="text-lg font-bold">$320</p>
                            <p className="text-xs text-red-500">+24%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Transport</p>
                            <p className="text-lg font-bold">$210</p>
                            <p className="text-xs text-green-500">-5%</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h3 className="text-lg font-medium mb-2">Recurring Expenses</h3>
                        <p className="text-muted-foreground mb-4">
                          You have 8 recurring subscriptions totaling $112.94 per month. This is 15% of your discretionary spending.
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Netflix</span>
                            <span className="font-medium">$15.99</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Spotify</span>
                            <span className="font-medium">$9.99</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Gym Membership</span>
                            <span className="font-medium">$49.99</span>
                          </div>
                          <div className="flex justify-between items-center text-muted-foreground">
                            <span>+5 more</span>
                            <span>$36.97</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-md">
                        <h3 className="text-lg font-medium mb-2">Budget Performance</h3>
                        <p className="text-muted-foreground mb-4">
                          You've stayed within budget in 6 out of 8 categories this month. Your overall budget adherence is 85%.
                        </p>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Food & Dining</span>
                              <span className="text-sm text-red-500">108%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded">
                              <div className="h-2 bg-red-500 rounded" style={{ width: '108%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Transportation</span>
                              <span className="text-sm text-green-500">72%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded">
                              <div className="h-2 bg-green-500 rounded" style={{ width: '72%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Entertainment</span>
                              <span className="text-sm text-red-500">120%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded">
                              <div className="h-2 bg-red-500 rounded" style={{ width: '120%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <UserCreditScore />
              <PaymentIntegration />
              
              <Card>
                <CardHeader>
                  <CardTitle>Finance Tips</CardTitle>
                  <CardDescription>
                    Personalized tips based on your spending habits
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <h3 className="font-medium">50/30/20 Rule</h3>
                    <p className="text-sm text-muted-foreground">
                      Try allocating 50% of income to needs, 30% to wants, and 20% to savings and debt repayment.
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <h3 className="font-medium">Emergency Fund</h3>
                    <p className="text-sm text-muted-foreground">
                      Build an emergency fund to cover 3-6 months of essential expenses.
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <h3 className="font-medium">Review Subscriptions</h3>
                    <p className="text-sm text-muted-foreground">
                      You have 3 subscriptions you haven't used in the last month. Consider cancelling them.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinancialAdvisor;
