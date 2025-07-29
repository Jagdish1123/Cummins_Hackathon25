
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award, TrendingUp, Percent, AlertTriangle, PiggyBank, BarChart2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface GroupBadgeProps {
  type: 'smart-spender' | 'top-saver' | 'balanced-budgeter' | 'needs-improvement' | 'investing-pro' | 'efficiency-expert';
  score?: number;
}

export const GroupBadge = ({ type, score }: GroupBadgeProps) => {
  const { language } = useLanguage();
  
  const badgeData = {
    'smart-spender': {
      icon: <TrendingUp className="h-4 w-4 mr-1" />,
      color: 'bg-green-100 text-green-800 hover:bg-green-200',
      label: {
        en: 'Smart Spender',
        mr: 'स्मार्ट खर्चकर्ता',
        hi: 'स्मार्ट खर्चकर्ता'
      },
      description: {
        en: 'This group makes intelligent spending decisions, prioritizing value over cost.',
        mr: 'हा गट बुद्धिमान खर्चाचे निर्णय घेतो, किंमतीपेक्षा मूल्याला प्राधान्य देतो.',
        hi: 'यह समूह बुद्धिमान खर्च निर्णय लेता है, लागत से अधिक मूल्य को प्राथमिकता देता है।'
      }
    },
    'top-saver': {
      icon: <PiggyBank className="h-4 w-4 mr-1" />,
      color: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      label: {
        en: 'Top Saver',
        mr: 'टॉप सेव्हर',
        hi: 'टॉप सेवर'
      },
      description: {
        en: 'Exceptional at saving money across categories consistently.',
        mr: 'सातत्याने सर्व श्रेणींमध्ये पैसे वाचवण्यात अपवादात्मक.',
        hi: 'लगातार सभी श्रेणियों में पैसे बचाने में असाधारण।'
      }
    },
    'balanced-budgeter': {
      icon: <BarChart2 className="h-4 w-4 mr-1" />,
      color: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      label: {
        en: 'Balanced Budgeter',
        mr: 'संतुलित बजेटर',
        hi: 'संतुलित बजटकर्ता'
      },
      description: {
        en: 'Maintains a healthy balance between expenses and savings.',
        mr: 'खर्च आणि बचत यांच्यात निरोगी संतुलन राखते.',
        hi: 'खर्च और बचत के बीच स्वस्थ संतुलन बनाए रखता है।'
      }
    },
    'needs-improvement': {
      icon: <AlertTriangle className="h-4 w-4 mr-1" />,
      color: 'bg-red-100 text-red-800 hover:bg-red-200',
      label: {
        en: 'Needs Improvement',
        mr: 'सुधारणेची आवश्यकता',
        hi: 'सुधार की आवश्यकता'
      },
      description: {
        en: 'This group should work on better financial habits and spending patterns.',
        mr: 'या गटाने चांगल्या आर्थिक सवयी आणि खर्चाच्या पद्धतींवर काम करणे आवश्यक आहे.',
        hi: 'इस समूह को बेहतर वित्तीय आदतों और खर्च पैटर्न पर काम करना चाहिए।'
      }
    },
    'investing-pro': {
      icon: <Percent className="h-4 w-4 mr-1" />,
      color: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
      label: {
        en: 'Investing Pro',
        mr: 'इन्व्हेस्टिंग प्रो',
        hi: 'निवेश प्रो'
      },
      description: {
        en: 'Shows excellent skills in investment decisions and financial planning.',
        mr: 'गुंतवणुकीच्या निर्णयांमध्ये आणि आर्थिक नियोजनात उत्कृष्ट कौशल्य दर्शवते.',
        hi: 'निवेश निर्णयों और वित्तीय योजना में उत्कृष्ट कौशल दिखाता है।'
      }
    },
    'efficiency-expert': {
      icon: <Award className="h-4 w-4 mr-1" />,
      color: 'bg-teal-100 text-teal-800 hover:bg-teal-200',
      label: {
        en: 'Efficiency Expert',
        mr: 'कार्यक्षमता तज्ञ',
        hi: 'दक्षता विशेषज्ञ'
      },
      description: {
        en: 'Maximizes value from every rupee spent with efficient financial management.',
        mr: 'कार्यक्षम आर्थिक व्यवस्थापनासह खर्च केलेल्या प्रत्येक रुपयातून मूल्य अधिकतम करते.',
        hi: 'कुशल वित्तीय प्रबंधन के साथ खर्च किए गए हर रुपये से मूल्य अधिकतम करता है।'
      }
    }
  };

  const data = badgeData[type];
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="outline" 
            className={`flex items-center px-3 py-1 ${data.color}`}
          >
            {data.icon}
            <span>{data.label[language]}</span>
            {score !== undefined && (
              <span className="ml-1.5 text-xs font-bold">{score}/100</span>
            )}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{data.description[language]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface GroupBadgesProps {
  badges: Array<{
    type: 'smart-spender' | 'top-saver' | 'balanced-budgeter' | 'needs-improvement' | 'investing-pro' | 'efficiency-expert';
    score?: number;
  }>;
}

export const GroupBadges = ({ badges }: GroupBadgesProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge, index) => (
        <GroupBadge key={index} type={badge.type} score={badge.score} />
      ))}
    </div>
  );
};
