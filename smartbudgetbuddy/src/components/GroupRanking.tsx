
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal } from 'lucide-react';
import { useLanguage } from "@/contexts/LanguageContext";

interface GroupRankItem {
  id: string;
  name: string;
  score: number;
  avatar?: string;
  memberCount: number;
}

interface GroupRankingProps {
  groups?: GroupRankItem[];
}

export const GroupRanking = ({ groups: initialGroups }: GroupRankingProps) => {
  const { language } = useLanguage();
  
  const defaultGroups: GroupRankItem[] = [
    { id: '1', name: 'Weekend Trip', score: 95, memberCount: 4 },
    { id: '2', name: 'Roommates', score: 88, memberCount: 3 },
    { id: '3', name: 'Office Lunch', score: 82, memberCount: 6 },
    { id: '4', name: 'Family Budget', score: 78, memberCount: 4 },
    { id: '5', name: 'Project Alpha', score: 65, memberCount: 5 },
  ];
  
  const groups = initialGroups || defaultGroups;
  
  // Sort groups by score
  const sortedGroups = [...groups].sort((a, b) => b.score - a.score);

  const translations = {
    en: {
      title: "Group Ranking",
      description: "See which groups manage expenses most efficiently",
      members: "members",
      score: "score",
      reliability: "reliability",
    },
    mr: {
      title: "गट रँकिंग",
      description: "कोणते गट खर्च सर्वात कार्यक्षमतेने व्यवस्थापित करतात ते पहा",
      members: "सदस्य",
      score: "स्कोर",
      reliability: "विश्वसनीयता",
    }
  };

  const t = translations[language];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sortedGroups.map((group, index) => {
            let medal = null;
            
            if (index === 0) {
              medal = <Trophy className="h-5 w-5 text-yellow-500" />;
            } else if (index === 1) {
              medal = <Medal className="h-5 w-5 text-gray-400" />;
            } else if (index === 2) {
              medal = <Medal className="h-5 w-5 text-amber-700" />;
            }
            
            // Calculate color based on score
            let progressColor;
            if (group.score >= 90) progressColor = "bg-green-500";
            else if (group.score >= 75) progressColor = "bg-blue-500";
            else if (group.score >= 60) progressColor = "bg-yellow-500";
            else progressColor = "bg-red-500";
            
            return (
              <div key={group.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center rounded-full w-7 h-7 bg-muted">
                      {medal || <span className="text-sm font-medium">{index + 1}</span>}
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={group.avatar} />
                        <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{group.name}</p>
                        <p className="text-xs text-muted-foreground">{group.memberCount} {t.members}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{group.score}</p>
                    <p className="text-xs text-muted-foreground">{t.reliability} {t.score}</p>
                  </div>
                </div>
                <Progress value={group.score} className={`h-1.5 ${progressColor}`} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupRanking;
