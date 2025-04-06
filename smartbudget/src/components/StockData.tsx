import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface StockQuote {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  color: string;
}

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

// Mock stock data since we're not using an actual API
const mockStocks: Stock[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    price: 2412.75,
    change: 34.5,
    changePercent: 1.45,
  },
  {
    symbol: "TATAMOTORS",
    name: "Tata Motors Ltd",
    price: 547.2,
    change: -8.3,
    changePercent: -1.49,
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    price: 1687.65,
    change: 22.75,
    changePercent: 1.37,
  },
  {
    symbol: "INFY",
    name: "Infosys Ltd",
    price: 1412.9,
    change: -5.65,
    changePercent: -0.4,
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 3276.45,
    change: 42.8,
    changePercent: 1.32,
  },
  {
    symbol: "WIPRO",
    name: "Wipro Ltd",
    price: 387.25,
    change: 3.15,
    changePercent: 0.82,
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank Ltd",
    price: 942.3,
    change: 12.45,
    changePercent: 1.34,
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    price: 628.75,
    change: -2.35,
    changePercent: -0.37,
  },
];

export function StockData() {
  const { t } = useLanguage();
  const [stockData, setStockData] = useState<StockQuote[]>([]);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock stock data while waiting for the Finnhub API integration
  useEffect(() => {
    // This would be replaced with actual API call to Finnhub
    const mockStocks = [
      {
        symbol: "AAPL",
        companyName: "Apple Inc.",
        price: 180.95,
        change: 1.95,
        changePercent: 1.09,
        color: "text-green-500",
      },
      {
        symbol: "MSFT",
        companyName: "Microsoft Corp.",
        price: 378.85,
        change: -3.15,
        changePercent: -0.82,
        color: "text-red-500",
      },
      {
        symbol: "GOOGL",
        companyName: "Alphabet Inc.",
        price: 154.32,
        change: 0.87,
        changePercent: 0.57,
        color: "text-green-500",
      },
      {
        symbol: "AMZN",
        companyName: "Amazon.com Inc.",
        price: 179.62,
        change: 2.43,
        changePercent: 1.37,
        color: "text-green-500",
      },
      {
        symbol: "RELIANCE.BSE",
        companyName: "Reliance Industries",
        price: 2456.3,
        change: -12.45,
        changePercent: -0.51,
        color: "text-red-500",
      },
      {
        symbol: "TATAMOTORS.BSE",
        companyName: "Tata Motors Ltd.",
        price: 943.75,
        change: 15.3,
        changePercent: 1.65,
        color: "text-green-500",
      },
    ];

    const historicalData = [
      { date: "Jan", value: 160.52 },
      { date: "Feb", value: 165.38 },
      { date: "Mar", value: 169.24 },
      { date: "Apr", value: 173.75 },
      { date: "May", value: 175.56 },
      { date: "Jun", value: 179.8 },
      { date: "Jul", value: 178.45 },
      { date: "Aug", value: 179.64 },
      { date: "Sep", value: 180.95 },
    ];

    setStockData(mockStocks);
    setHistoryData(historicalData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Simulate API call delay
    const fetchStocks = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call to something like Finnhub
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStocks(mockStocks);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[300px] w-full rounded-md" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("Search stocks...")}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => setSearchQuery("")}>
          {t("Reset")}
        </Button>
      </div>

      <div className="h-[200px] w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historyData}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis domain={["dataMin - 5", "dataMax + 5"]} hide />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStocks.map((stock) => (
          <Card
            key={stock.symbol}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedStock(stock.symbol)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{stock.symbol}</p>
                  <p className="text-sm text-muted-foreground">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ₹{stock.price.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-end">
                    {stock.change > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span
                      className={cn(
                        "text-xs",
                        stock.change > 0 ? "text-green-500" : "text-red-500"
                      )}
                    >
                      {stock.change > 0 ? "+" : ""}
                      {stock.change.toFixed(2)} (
                      {stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
