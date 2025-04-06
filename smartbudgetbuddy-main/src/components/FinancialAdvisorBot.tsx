
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Bot, SendHorizonal, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Sample bot responses based on user input patterns
const getBotResponse = (message: string): string => {
  const lowercaseMsg = message.toLowerCase();
  
  if (lowercaseMsg.includes("budget") && lowercaseMsg.includes("create")) {
    return "Creating a budget is a great first step! I recommend the 50-30-20 rule: 50% for needs, 30% for wants, and 20% for savings. Based on your recent spending, you might want to reduce your food expenses which are currently 35% of your total spending.";
  }
  
  if (lowercaseMsg.includes("save") || lowercaseMsg.includes("saving")) {
    return "Looking at your spending patterns, you could save approximately $120 per month by reducing your subscription services and dining out expenses. Would you like me to suggest specific areas where you could cut back?";
  }
  
  if (lowercaseMsg.includes("invest") || lowercaseMsg.includes("investment")) {
    return "Based on your current financial situation, you might consider starting with a retirement account like a 401(k) or IRA. For beginners, index funds are a great low-risk option. Would you like more specific investment recommendations?";
  }
  
  if (lowercaseMsg.includes("debt") || lowercaseMsg.includes("loan")) {
    return "I recommend prioritizing high-interest debt first. Based on your profile, you should focus on your credit card debt before student loans. Allocating an extra $100 monthly could reduce your payoff time by 2 years.";
  }
  
  if (lowercaseMsg.includes("expense") || lowercaseMsg.includes("spending")) {
    return "I've analyzed your spending patterns. Your largest expense categories are housing (32%), food (18%), and transportation (15%). Your food expenses have increased by 12% compared to last month. Would you like suggestions to reduce these costs?";
  }
  
  return "Thanks for your message. I can help with budgeting, saving strategies, investment advice, debt management, and analyzing your expenses. What specific financial guidance are you looking for today?";
};

export function FinancialAdvisorBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your AI Financial Advisor. I can help with budgeting, saving tips, and personalized financial insights. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    // Simulate bot thinking and typing
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(userMessage.content),
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="border-b">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback><BarChart2 className="h-4 w-4" /></AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg">Financial Advisor</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        <ScrollArea className="h-[400px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className="mt-1 h-8 w-8">
                    {message.sender === "user" ? (
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    ) : (
                      <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                    )}
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 text-sm ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.content}
                    <div
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <Avatar className="mt-1 h-8 w-8">
                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-3 text-sm bg-muted">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-3 pb-5 px-4 border-t">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Ask for financial advice..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            disabled={isTyping}
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
          >
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
