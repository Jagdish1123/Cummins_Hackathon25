
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BaStar, BaStarFill, BaTrophy, BaShield, BaGift, BaWallet } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Achievement {
  id: string;
  name: {
    en: string;
    mr: string;
  };
  description: {
    en: string;
    mr: string;
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
      mr: "पैसे वाचवणारा" 
    },
    description: { 
      en: "Save ₹5,000 or more in a month", 
      mr: "एका महिन्यात ₹5,000 किंवा अधिक वाचवा" 
    },
    icon: BaWallet,
    progress: 75,
    unlocked: false,
    color: "bg-green-500"
  },
  {
    id: "budget-master",
    name: { 
      en: "Budget Master", 
      mr: "बजेट मास्टर" 
    },
    description: { 
      en: "Stick to your budget for 3 consecutive months", 
      mr: "लागोपाठ 3 महिने आपल्या बजेटचे पालन करा" 
    },
    icon: BaShield,
    progress: 100,
    unlocked: true,
    color: "bg-blue-500"
  },
  {
    id: "money-gaver",
    name: { 
      en: "Money Gaver", 
      mr: "पैसे देणारा" 
    },
    description: { 
      en: "Donate to charities for 3 months", 
      mr: "3 महिने धर्मादाय संस्थांना दान करा" 
    },
    icon: BaGift,
    progress: 33,
    unlocked: false,
    color: "bg-purple-500"
  },
  {
    id: "expense-tracker",
    name: { 
      en: "Expense Tracker", 
      mr: "खर्च ट्रॅकर" 
    },
    description: { 
      en: "Track all expenses for 30 consecutive days", 
      mr: "सलग 30 दिवस सर्व खर्च ट्रॅक करा" 
    },
    icon: BaTrophy,
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
        <CardTitle>{language === 'en' ? 'Achievements & Badges' : 'उपलब्धी आणि बॅजेस'}</CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Earn badges by developing good financial habits' 
            : 'चांगल्या आर्थिक सवयी विकसित करून बॅजेस मिळवा'}
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
                        {language === 'en' ? 'Unlocked' : 'अनलॉक केले'}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {achievement.description[language]}
                  </p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>{achievement.progress}%</span>
                      {achievement.unlocked && <span>{language === 'en' ? 'Completed' : 'पूर्ण झाले'}</span>}
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
