import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  category: string;
  image?: string;
}

// Mock news data since we're not using a real API
const mockNewsItems: NewsItem[] = [
  {
    id: "1",
    title: "Reserve Bank of India keeps repo rate unchanged at 6.50%",
    summary:
      "The Reserve Bank of India's monetary policy committee kept the repo rate unchanged for the seventh consecutive time, maintaining its stance on withdrawal of accommodation.",
    source: "Economic Times",
    url: "https://example.com/news/1",
    publishedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    category: "Economy",
    image: "/images/news/rbi.jpg",
  },
  {
    id: "2",
    title: "Indian IT stocks fall as US recession fears mount",
    summary:
      "Major Indian IT stocks faced selling pressure as concerns over a potential US recession grew, impacting the outlook for technology spending by US clients.",
    source: "Financial Express",
    url: "https://example.com/news/2",
    publishedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    category: "Markets",
  },
  {
    id: "3",
    title: "Government announces new PLI scheme for manufacturing sector",
    summary:
      "The Indian government announced a new Production Linked Incentive (PLI) scheme worth ₹10,000 crore to boost domestic manufacturing and attract investments.",
    source: "Business Standard",
    url: "https://example.com/news/3",
    publishedAt: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
    category: "Policy",
    image: "/images/news/manufacturing.jpg",
  },
  {
    id: "4",
    title:
      "Reliance Industries announces strategic partnership with global tech firm",
    summary:
      "Reliance Industries has entered into a strategic partnership with a leading global technology company to accelerate digital transformation in India.",
    source: "LiveMint",
    url: "https://example.com/news/4",
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    category: "Corporate",
  },
  {
    id: "5",
    title:
      "Cryptocurrency regulations in India expected by end of financial year",
    summary:
      "Indian Finance Minister hinted at comprehensive cryptocurrency regulations being finalized and likely to be introduced by the end of the current financial year.",
    source: "NDTV Profit",
    url: "https://example.com/news/5",
    publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    category: "Regulation",
    image: "/images/news/crypto.jpg",
  },
];

export function StockNews() {
  const { t } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    // Simulate API call delay
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call to a news service
        await new Promise((resolve) => setTimeout(resolve, 1800));
        setNews(mockNewsItems);
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, news.length));
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return "recently";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "markets":
        return "bg-blue-100 text-blue-800";
      case "economy":
        return "bg-green-100 text-green-800";
      case "corporate":
        return "bg-purple-100 text-purple-800";
      case "policy":
        return "bg-amber-100 text-amber-800";
      case "regulation":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Skeleton className="h-20 w-20 rounded-md flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {news.slice(0, visibleCount).map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {item.image && (
                      <div className="w-full md:w-24 h-40 md:h-24 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-500">
                            {t("Image")}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <Badge
                          variant="outline"
                          className={`ml-2 flex-shrink-0 ${getCategoryColor(
                            item.category
                          )}`}
                        >
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {item.summary}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          {item.source} • {formatDate(item.publishedAt)}
                        </span>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs flex items-center text-primary hover:underline"
                        >
                          {t("Read More")}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {visibleCount < news.length && (
            <div className="text-center">
              <Button variant="outline" onClick={loadMore}>
                {t("Load More")}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
