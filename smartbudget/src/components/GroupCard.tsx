import { cn } from "@/lib/utils";
import {
  Users,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  User,
} from "lucide-react";
import type { Group, GroupMember } from "@/types/group";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface GroupCardProps {
  group: Group;
  onClick?: (group: Group) => void;
  className?: string;
}

const statusConfig = {
  settled: {
    icon: CheckCircle,
    text: "Settled",
    color: "text-green-500 bg-green-50",
  },
  pending: {
    icon: Clock,
    text: "Pending",
    color: "text-amber-500 bg-amber-50",
  },
  overdue: {
    icon: AlertCircle,
    text: "Overdue",
    color: "text-red-500 bg-red-50",
  },
};

export function GroupCard({ group, onClick, className }: GroupCardProps) {
  const { t } = useLanguage();
  const formattedDate = new Date(group.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(group.totalAmount);

  const paidCount = group.members.filter((member) => member.paid).length;
  const totalMembers = group.members.length;
  const StatusIcon = statusConfig[group.status].icon;

  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-md transition-shadow",
        className
      )}
      onClick={() => onClick && onClick(group)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{group.name}</h3>
              {group.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {group.description}
                </p>
              )}
            </div>
            <Badge
              variant="outline"
              className={cn(
                "flex items-center gap-1 px-2 py-1",
                statusConfig[group.status].color
              )}
            >
              <StatusIcon className="h-3 w-3" />
              <span>{t(statusConfig[group.status].text)}</span>
            </Badge>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{formattedAmount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {t("{{paidCount}} of {{totalMembers}} paid", {
                  paidCount,
                  totalMembers,
                })}
              </span>
            </div>
            <div className="flex">
              <div className="bg-muted flex items-center justify-center h-6 w-6 rounded-full mr-1">
                <User className="h-3 w-3 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">
                {t("{{count}} members", { count: totalMembers })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GroupCard;
