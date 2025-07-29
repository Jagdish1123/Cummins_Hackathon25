
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Bot, SendHorizonal, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Translations for the bot
const translations = {
  en: {
    welcomeMessage: "Hi there! I'm your AI Financial Advisor. I can help with budgeting, saving tips, and personalized financial insights. How can I assist you today?",
    budgetCreate: "Creating a budget is a great first step! I recommend the 50-30-20 rule: 50% for needs, 30% for wants, and 20% for savings. Based on your recent spending, you might want to reduce your food expenses which are currently 35% of your total spending.",
    save: "Looking at your spending patterns, you could save approximately ₹9,000 per month by reducing your subscription services and dining out expenses. Would you like me to suggest specific areas where you could cut back?",
    invest: "Based on your current financial situation, you might consider starting with a retirement account like NPS or PPF. For beginners, index funds are a great low-risk option. Would you like more specific investment recommendations?",
    debt: "I recommend prioritizing high-interest debt first. Based on your profile, you should focus on your credit card debt before student loans. Allocating an extra ₹7,500 monthly could reduce your payoff time by 2 years.",
    expense: "I've analyzed your spending patterns. Your largest expense categories are housing (32%), food (18%), and transportation (15%). Your food expenses have increased by 12% compared to last month. Would you like suggestions to reduce these costs?",
    defaultResponse: "Thanks for your message. I can help with budgeting, saving strategies, investment advice, debt management, and analyzing your expenses. What specific financial guidance are you looking for today?",
    advisor: "Financial Advisor",
    askForFinancialAdvice: "Ask for financial advice...",
    typing: "Typing..."
  },
  mr: {
    welcomeMessage: "नमस्कार! मी तुमचा एआय फायनान्शियल अॅडव्हायझर आहे. मी बजेटिंग, बचतीचे टिप्स आणि वैयक्तिक आर्थिक अंतर्दृष्टींसह मदत करू शकतो. मी आज तुम्हाला कशी मदत करू शकतो?",
    budgetCreate: "बजेट तयार करणे हे एक चांगले पहिले पाऊल आहे! मी 50-30-20 नियमाची शिफारस करतो: 50% गरजांसाठी, 30% इच्छांसाठी आणि 20% बचतीसाठी. तुमच्या अलीकडील खर्चावर आधारित, तुम्ही तुमच्या अन्न खर्चात कपात करू शकता जे सध्या तुमच्या एकूण खर्चाच्या 35% आहेत.",
    save: "तुमच्या खर्चाच्या पॅटर्नवर नजर टाकता, तुम्ही तुमच्या सबस्क्रिप्शन सेवा आणि बाहेर जेवण्याच्या खर्चात कमी करून दरमहा सुमारे ₹9,000 वाचवू शकता. तुम्हाला माझ्याकडून विशिष्ट क्षेत्रांची सूचना हवी आहे का जिथे तुम्ही कपात करू शकता?",
    invest: "तुमच्या सध्याच्या आर्थिक परिस्थितीवर आधारित, तुम्ही NPS किंवा PPF सारख्या निवृत्तिवेतन खात्याने सुरुवात करू शकता. नवीन गुंतवणूकदारांसाठी, इंडेक्स फंड हा एक कमी जोखीम असलेला चांगला पर्याय आहे. तुम्हाला अधिक विशिष्ट गुंतवणूक शिफारसी हव्या आहेत का?",
    debt: "मी प्रथम उच्च-व्याज कर्जावर लक्ष केंद्रित करण्याची शिफारस करतो. तुमच्या प्रोफाइलवर आधारित, तुम्ही विद्यार्थी कर्जापूर्वी तुमच्या क्रेडिट कार्ड कर्जावर लक्ष केंद्रित करावे. दरमहा अतिरिक्त ₹7,500 वाटप केल्याने तुमचा परतफेडीचा कालावधी 2 वर्षांनी कमी होऊ शकतो.",
    expense: "मी तुमच्या खर्चाच्या पॅटर्नचे विश्लेषण केले आहे. तुमच्या सर्वात मोठ्या खर्चाच्या श्रेणी आहेत हाऊसिंग (32%), अन्न (18%), आणि वाहतूक (15%). तुमचा अन्न खर्च गेल्या महिन्याच्या तुलनेत 12% वाढला आहे. तुम्हाला हे खर्च कमी करण्यासाठी सूचना हव्या आहेत का?",
    defaultResponse: "तुमच्या संदेशाबद्दल धन्यवाद. मी बजेटिंग, बचत धोरणे, गुंतवणूक सल्ला, कर्ज व्यवस्थापन आणि तुमच्या खर्चांचे विश्लेषण करण्यात मदत करू शकतो. तुम्हाला कोणत्या विशिष्ट आर्थिक मार्गदर्शनाची आवश्यकता आहे?",
    advisor: "आर्थिक सल्लागार",
    askForFinancialAdvice: "आर्थिक सल्ला विचारा...",
    typing: "टाइप करत आहे..."
  },
  hi: {
    welcomeMessage: "नमस्ते! मैं आपका AI वित्तीय सलाहकार हूँ। मैं बजटिंग, बचत के टिप्स और व्यक्तिगत वित्तीय अंतर्दृष्टि के साथ मदद कर सकता हूँ। मैं आज आपकी कैसे मदद कर सकता हूँ?",
    budgetCreate: "बजट बनाना एक बढ़िया पहला कदम है! मैं 50-30-20 नियम की सिफारिश करता हूँ: 50% जरूरतों के लिए, 30% इच्छाओं के लिए, और 20% बचत के लिए। आपके हाल के खर्च के आधार पर, आप अपने खाद्य खर्च को कम कर सकते हैं जो वर्तमान में आपके कुल खर्च का 35% है।",
    save: "आपके खर्च पैटर्न को देखते हुए, आप अपनी सब्सक्रिप्शन सेवाओं और बाहर खाने के खर्च को कम करके प्रति माह लगभग ₹9,000 बचा सकते हैं। क्या आप चाहेंगे कि मैं विशिष्ट क्षेत्रों का सुझाव दूँ जहां आप कटौती कर सकते हैं?",
    invest: "आपकी वर्तमान वित्तीय स्थिति के आधार पर, आप NPS या PPF जैसे रिटायरमेंट अकाउंट से शुरुआत कर सकते हैं। शुरुआती लोगों के लिए, इंडेक्स फंड एक अच्छा कम जोखिम वाला विकल्प है। क्या आप अधिक विशिष्ट निवेश अनुशंसाएँ चाहेंगे?",
    debt: "मैं पहले उच्च-ब्याज वाले ऋण पर ध्यान केंद्रित करने की सिफारिश करता हूँ। आपके प्रोफाइल के आधार पर, आपको छात्र ऋण से पहले अपने क्रेडिट कार्ड ऋण पर ध्यान देना चाहिए। प्रति माह अतिरिक्त ₹7,500 आवंटित करने से आपका भुगतान समय 2 साल कम हो सकता है।",
    expense: "मैंने आपके खर्च पैटर्न का विश्लेषण किया है। आपकी सबसे बड़ी खर्च श्रेणियाँ हैं आवास (32%), भोजन (18%), और परिवहन (15%)। आपका खाद्य खर्च पिछले महीने की तुलना में 12% बढ़ गया है। क्या आप इन लागतों को कम करने के लिए सुझाव चाहेंगे?",
    defaultResponse: "आपके संदेश के लिए धन्यवाद। मैं बजटिंग, बचत रणनीतियों, निवेश सलाह, ऋण प्रबंधन, और आपके खर्चों का विश्लेषण करने में मदद कर सकता हूँ। आज आप किस विशिष्ट वित्तीय मार्गदर्शन की तलाश कर रहे हैं?",
    advisor: "वित्तीय सलाहकार",
    askForFinancialAdvice: "वित्तीय सलाह के लिए पूछें...",
    typing: "टाइप कर रहा है..."
  }
};

// Sample bot responses based on user input patterns
const getBotResponse = (message: string, language: string): string => {
  const lowercaseMsg = message.toLowerCase();
  const t = translations[language as keyof typeof translations];
  
  if (lowercaseMsg.includes("budget") && lowercaseMsg.includes("create")) {
    return t.budgetCreate;
  }
  
  if (lowercaseMsg.includes("save") || lowercaseMsg.includes("saving")) {
    return t.save;
  }
  
  if (lowercaseMsg.includes("invest") || lowercaseMsg.includes("investment")) {
    return t.invest;
  }
  
  if (lowercaseMsg.includes("debt") || lowercaseMsg.includes("loan")) {
    return t.debt;
  }
  
  if (lowercaseMsg.includes("expense") || lowercaseMsg.includes("spending")) {
    return t.expense;
  }
  
  return t.defaultResponse;
};

export function FinancialAdvisorBot() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: t.welcomeMessage,
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
        content: getBotResponse(userMessage.content, language),
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
          <CardTitle className="text-lg">{t.advisor}</CardTitle>
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
            placeholder={t.askForFinancialAdvice}
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
