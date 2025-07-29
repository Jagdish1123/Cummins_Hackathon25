
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, TrendingDown, ArrowRight, LineChart, BarChart2, PieChart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock stock data
const mockStocks = [
  { id: 1, symbol: 'RELIANCE', name: 'Reliance Industries', price: 2850.75, change: 34.25, changePercent: 1.21 },
  { id: 2, symbol: 'TCS', name: 'Tata Consultancy Services', price: 3624.50, change: -12.75, changePercent: -0.35 },
  { id: 3, symbol: 'HDFC', name: 'HDFC Bank', price: 1675.25, change: 22.80, changePercent: 1.37 },
  { id: 4, symbol: 'INFY', name: 'Infosys', price: 1549.90, change: -8.30, changePercent: -0.53 },
  { id: 5, symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 785.65, change: 15.20, changePercent: 1.97 },
  { id: 6, symbol: 'HCLTECH', name: 'HCL Technologies', price: 1232.40, change: 28.70, changePercent: 2.38 },
  { id: 7, symbol: 'WIPRO', name: 'Wipro', price: 452.80, change: -5.60, changePercent: -1.22 },
  { id: 8, symbol: 'LT', name: 'Larsen & Toubro', price: 2498.35, change: 43.15, changePercent: 1.76 },
];

// Portfolio simulation data
const mockPortfolio = [
  { symbol: 'RELIANCE', shares: 10, buyPrice: 2800.50, currentValue: 28507.50 },
  { symbol: 'TCS', shares: 5, buyPrice: 3600.00, currentValue: 18122.50 },
  { symbol: 'INFY', shares: 15, buyPrice: 1520.75, currentValue: 23248.50 },
];

const translations = {
  en: {
    stockMarketDashboard: "Stock Market Dashboard",
    latestMarketTrends: "Latest Market Trends",
    portfolioSimulator: "Portfolio Simulator",
    marketInsights: "Market Insights",
    watchSymbol: "Watch Symbol",
    symbol: "Symbol",
    name: "Name",
    price: "Price (₹)",
    change: "Change",
    watchlist: "Watchlist",
    portfolio: "Portfolio",
    totalValue: "Total Value",
    profit: "Profit/Loss",
    addStock: "Add Stock",
    learn: "Learning Resources",
    insights: "Today's Insights",
    analysis: "Market Analysis",
    simulateInvestment: "Simulate Investment",
    addToPortfolio: "Add to Portfolio",
    yourPortfolio: "Your Portfolio",
    shares: "Shares",
    buyPrice: "Buy Price (₹)",
    currentValue: "Current Value (₹)",
    viewChart: "View Chart",
    search: "Search for stocks...",
    addToWatchlist: "Add to Watchlist",
    popularStocks: "Popular Stocks",
  },
  mr: {
    stockMarketDashboard: "स्टॉक मार्केट डॅशबोर्ड",
    latestMarketTrends: "नवीनतम मार्केट ट्रेंड्स",
    portfolioSimulator: "पोर्टफोलिओ सिम्युलेटर",
    marketInsights: "मार्केट इनसाइट्स",
    watchSymbol: "वॉच सिंबॉल",
    symbol: "सिंबॉल",
    name: "नाव",
    price: "किंमत (₹)",
    change: "बदल",
    watchlist: "वॉचलिस्ट",
    portfolio: "पोर्टफोलिओ",
    totalValue: "एकूण मूल्य",
    profit: "नफा/तोटा",
    addStock: "स्टॉक जोडा",
    learn: "शिक्षण संसाधने",
    insights: "आजचे इनसाइट्स",
    analysis: "मार्केट विश्लेषण",
    simulateInvestment: "गुंतवणूक सिम्युलेट करा",
    addToPortfolio: "पोर्टफोलिओमध्ये जोडा",
    yourPortfolio: "तुमचा पोर्टफोलिओ",
    shares: "शेअर्स",
    buyPrice: "खरेदी किंमत (₹)",
    currentValue: "सध्याचे मूल्य (₹)",
    viewChart: "चार्ट पहा",
    search: "स्टॉक्स शोधा...",
    addToWatchlist: "वॉचलिस्टमध्ये जोडा",
    popularStocks: "लोकप्रिय स्टॉक्स",
  },
  hi: {
    stockMarketDashboard: "स्टॉक मार्केट डैशबोर्ड",
    latestMarketTrends: "नवीनतम मार्केट ट्रेंड्स",
    portfolioSimulator: "पोर्टफोलियो सिम्युलेटर",
    marketInsights: "मार्केट इनसाइट्स",
    watchSymbol: "वॉच सिंबॉल",
    symbol: "सिंबॉल",
    name: "नाम",
    price: "कीमत (₹)",
    change: "बदलाव",
    watchlist: "वॉचलिस्ट",
    portfolio: "पोर्टफोलियो",
    totalValue: "कुल मूल्य",
    profit: "लाभ/हानि",
    addStock: "स्टॉक जोड़ें",
    learn: "शिक्षण संसाधन",
    insights: "आज के इनसाइट्स",
    analysis: "मार्केट विश्लेषण",
    simulateInvestment: "निवेश सिम्युलेट करें",
    addToPortfolio: "पोर्टफोलियो में जोड़ें",
    yourPortfolio: "आपका पोर्टफोलियो",
    shares: "शेयर्स",
    buyPrice: "खरीद मूल्य (₹)",
    currentValue: "वर्तमान मूल्य (₹)",
    viewChart: "चार्ट देखें",
    search: "स्टॉक्स खोजें...",
    addToWatchlist: "वॉचलिस्ट में जोड़ें",
    popularStocks: "लोकप्रिय स्टॉक्स",
  }
};

export const StockMarketDashboard = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState("market");
  const [watchlist, setWatchlist] = useState(mockStocks.slice(0, 4));
  const [portfolio, setPortfolio] = useState(mockPortfolio);
  
  const portfolioTotal = portfolio.reduce((sum, stock) => sum + stock.currentValue, 0);
  const portfolioInitial = portfolio.reduce((sum, stock) => sum + (stock.buyPrice * stock.shares), 0);
  const portfolioProfit = portfolioTotal - portfolioInitial;
  const profitPercentage = (portfolioProfit / portfolioInitial) * 100;
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold">{t.stockMarketDashboard}</CardTitle>
        <CardDescription>{t.latestMarketTrends}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="market">
              <LineChart className="h-4 w-4 mr-2" />
              <span>{t.watchlist}</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio">
              <PieChart className="h-4 w-4 mr-2" />
              <span>{t.portfolio}</span>
            </TabsTrigger>
            <TabsTrigger value="insights">
              <BarChart2 className="h-4 w-4 mr-2" />
              <span>{t.insights}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="market" className="mt-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Input placeholder={t.search} className="flex-1" />
              <Button size="sm">{t.addToWatchlist}</Button>
            </div>
            
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden border rounded-lg">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {t.symbol}
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {t.name}
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {t.price}
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {t.change}
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      {watchlist.map((stock) => (
                        <tr key={stock.id} className="hover:bg-muted/50">
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                            {stock.symbol}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {stock.name}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-right">
                            ₹{stock.price.toLocaleString()}
                          </td>
                          <td className={`px-4 py-2 whitespace-nowrap text-sm text-right ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            <div className="flex items-center justify-end">
                              {stock.change >= 0 ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              ) : (
                                <TrendingDown className="h-3 w-3 mr-1" />
                              )}
                              {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                            </div>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-right">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium mb-2">{t.popularStocks}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {mockStocks.slice(4, 8).map((stock) => (
                  <Button key={stock.id} variant="outline" className="justify-start h-auto py-2 px-3">
                    <div className="text-left flex flex-col">
                      <span className="font-medium">{stock.symbol}</span>
                      <span className={`text-xs flex items-center ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="portfolio" className="mt-4 space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">{t.totalValue}</div>
                  <div className="text-2xl font-bold">₹{portfolioTotal.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card className={portfolioProfit >= 0 ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"}>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">{t.profit}</div>
                  <div className={`text-2xl font-bold ${portfolioProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {portfolioProfit >= 0 ? '+' : ''}₹{portfolioProfit.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card className={portfolioProfit >= 0 ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"}>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">%</div>
                  <div className={`text-2xl font-bold ${portfolioProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {profitPercentage >= 0 ? '+' : ''}{profitPercentage.toFixed(2)}%
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <h3 className="font-medium mb-2">{t.yourPortfolio}</h3>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden border rounded-lg">
                  <table className="min-w-full divide-y divide-border">
                    <thead className="bg-muted/50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {t.symbol}
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {t.shares}
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {t.buyPrice}
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {t.currentValue}
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-background divide-y divide-border">
                      {portfolio.map((stock, index) => (
                        <tr key={index} className="hover:bg-muted/50">
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                            {stock.symbol}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-right">
                            {stock.shares}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-right">
                            ₹{stock.buyPrice.toLocaleString()}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-right">
                            ₹{stock.currentValue.toLocaleString()}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-right">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <Button size="sm">{t.simulateInvestment}</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="mt-4 space-y-4">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">{t.marketInsights}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Nifty 50 is up by 1.2% today, led by gains in banking and technology stocks. The market sentiment remains positive due to strong quarterly results and global cues.
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <LineChart className="h-4 w-4 mr-2" />
                      {t.analysis}
                    </Button>
                    <Button variant="outline" size="sm">
                      {t.learn}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">{t.popularStocks}</h3>
                  <div className="space-y-3">
                    {mockStocks.slice(0, 3).map((stock) => (
                      <div key={stock.id} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                        <div>
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-sm text-muted-foreground">{stock.name}</div>
                        </div>
                        <div className="text-right">
                          <div>₹{stock.price.toLocaleString()}</div>
                          <div className={stock.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
