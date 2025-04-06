import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { BrainCircuit, Send, User } from "lucide-react";
import { toast } from "sonner";

type Message = {
  type: "user" | "ai";
  content: string;
};

interface FinancialAdvisorBotProps {
  systemPrompt?: string;
}

const initialMessages: Message[] = [
  {
    type: "ai",
    content: "Hello! I'm your AI financial advisor. How can I help you today?",
  },
];

export function FinancialAdvisorBot({
  systemPrompt,
}: FinancialAdvisorBotProps) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the conversation
    const userMessage: Message = {
      type: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate AI thinking time
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate a mock AI response based on the user input
      let aiResponse = "";

      if (
        input.toLowerCase().includes("savings") ||
        input.toLowerCase().includes("save")
      ) {
        aiResponse =
          "Based on your current spending patterns, I recommend setting aside 20% of your monthly income for savings. Consider automating transfers to a high-yield savings account on payday.";
      } else if (
        input.toLowerCase().includes("invest") ||
        input.toLowerCase().includes("investment")
      ) {
        aiResponse =
          "For beginners, I recommend starting with index funds which provide diversification. Consider splitting your investments between equity and debt funds based on your risk tolerance.";
      } else if (
        input.toLowerCase().includes("debt") ||
        input.toLowerCase().includes("loan")
      ) {
        aiResponse =
          "I recommend using the avalanche method to tackle your debts - focus on high-interest debts first while making minimum payments on others. This will save you money on interest in the long run.";
      } else if (input.toLowerCase().includes("budget")) {
        aiResponse =
          "The 50/30/20 budget rule is a good starting point: 50% for needs, 30% for wants, and 20% for savings and debt repayment. Based on your income, that would be approximately ₹25,000 for needs, ₹15,000 for wants, and ₹10,000 for savings.";
      } else {
        aiResponse =
          "Thank you for your question. To provide more personalized financial advice, I would need more details about your financial situation, including your income, expenses, savings, and financial goals.";
      }

      // Add AI response to the conversation
      const aiMessage: Message = {
        type: "ai",
        content: aiResponse,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast.error(t("Failed to get response. Please try again."));
      console.error("Error getting AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg overflow-hidden">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex max-w-[80%] gap-2">
                <Avatar className={message.type === "user" ? "order-2" : ""}>
                  {message.type === "user" ? (
                    <>
                      <AvatarImage src="/avatars/user.png" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/avatars/ai.png" />
                      <AvatarFallback>
                        <BrainCircuit className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div
                  className={`rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <Separator />

      <div className="p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            placeholder={t("Ask a financial question...")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">{t("Send")}</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
