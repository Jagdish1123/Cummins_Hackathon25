
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Trophy, Shield, Gift, Wallet } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Achievement {
  id: string;
  name: {
    en: string;
    mr: string;
    hi: string;
  };
  description: {
    en: string;
    mr: string;
    hi: string;
  };
  icon: React.ComponentType<any>;
  progress: number;
  unlocked: boolean;
  color: string;
}

const achievements: Achievement[] = [
  {
    id: "money-saver",
    name: { 
      en: "Money Saver", 
      mr: "पैसे वाचवणारा",
      hi: "पैसे बचानेवाला"
    },
    description: { 
      en: "Save ₹5,000 or more in a month", 
      mr: "एका महिन्यात ₹5,000 किंवा अधिक वाचवा",
      hi: "एक महीने में ₹5,000 या अधिक बचाएं"
    },
    icon: Wallet,
    progress: 75,
    unlocked: false,
    color: "bg-green-500"
  },
  {
    id: "budget-master",
    name: { 
      en: "Budget Master", 
      mr: "बजेट मास्टर",
      hi: "बजट मास्टर"
    },
    description: { 
      en: "Stick to your budget for 3 consecutive months", 
      mr: "लागोपाठ 3 महिने आपल्या बजेटचे पालन करा",
      hi: "लगातार 3 महीने अपने बजट का पालन करें"
    },
    icon: Shield,
    progress: 100,
    unlocked: true,
    color: "bg-blue-500"
  },
  {
    id: "money-gaver",
    name: { 
      en: "Money Gaver", 
      mr: "पैसे देणारा",
      hi: "पैसे देनेवाला"
    },
    description: { 
      en: "Donate to charities for 3 months", 
      mr: "3 महिने धर्मादाय संस्थांना दान करा",
      hi: "3 महीने तक धर्मार्थ संस्थाओं को दान दें"
    },
    icon: Gift,
    progress: 33,
    unlocked: false,
    color: "bg-purple-500"
  },
  {
    id: "expense-tracker",
    name: { 
      en: "Expense Tracker", 
      mr: "खर्च ट्रॅकर",
      hi: "खर्च ट्रैकर"
    },
    description: { 
      en: "Track all expenses for 30 consecutive days", 
      mr: "सलग 30 दिवस सर्व खर्च ट्रॅक करा",
      hi: "लगातार 30 दिनों तक सभी खर्चों को ट्रैक करें"
    },
    icon: Trophy,
    progress: 100,
    unlocked: true,
    color: "bg-yellow-500"
  }
];

export const AchievementsBadges = () => {
  const { language } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'Achievements & Badges' : 
           language === 'mr' ? 'उपलब्धी आणि बॅजेस' :
           'उपलब्धियां और बैज'}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Earn badges by developing good financial habits' 
            : language === 'mr'
            ? 'चांगल्या आर्थिक सवयी विकसित करून बॅजेस मिळवा'
            : 'अच्छी वित्तीय आदतें विकसित करके बैज अर्जित करें'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`p-4 rounded-lg border ${achievement.unlocked ? 'bg-muted/30' : 'bg-muted/10'}`}
            >
              <div className="flex items-start">
                <div className={`rounded-full p-2 mr-3 ${achievement.color} text-white`}>
                  <achievement.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{achievement.name[language]}</h4>
                    {achievement.unlocked && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                        {language === 'en' ? 'Unlocked' : 
                         language === 'mr' ? 'अनलॉक केले' :
                         'अनलॉक किया गया'}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {achievement.description[language]}
                  </p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>{achievement.progress}%</span>
                      {achievement.unlocked && <span>
                        {language === 'en' ? 'Completed' : 
                         language === 'mr' ? 'पूर्ण झाले' :
                         'पूरा हुआ'}
                      </span>}
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsBadges;
