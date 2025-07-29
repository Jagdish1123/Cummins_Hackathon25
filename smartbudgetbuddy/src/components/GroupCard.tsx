
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";

export interface GroupMember {
  id: string;
  name: string;
  paid: boolean;
  amount?: number;
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  totalAmount: number;
  date: string;
  members: GroupMember[];
  status: "pending" | "settled" | "overdue";
  category: string;
}

interface GroupCardProps {
  group: Group;
  currency?: string;
}

const GroupCard = ({ group, currency = "₹" }: GroupCardProps) => {
  const paidMembers = group.members.filter(member => member.paid).length;
  const totalMembers = group.members.length;
  const progressPercentage = (paidMembers / totalMembers) * 100;
  
  // Format currency with Indian numbering system if INR
  const formatAmount = (amount: number): string => {
    if (currency === "₹") {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(amount);
    }
    return `${currency}${amount.toLocaleString()}`;
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{group.name}</h3>
            {group.description && (
              <p className="text-muted-foreground text-sm mt-1">{group.description}</p>
            )}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-col space-y-4 mt-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{format(new Date(group.date), "dd MMM yyyy")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span>{group.category}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Badge variant={group.status === "settled" ? "outline" : "secondary"} className={`capitalize ${group.status === "settled" ? "text-green-500 bg-green-50" : group.status === "overdue" ? "text-red-500 bg-red-50" : ""}`}>
              {group.status}
            </Badge>
            <div className="font-semibold">{formatAmount(group.totalAmount)}</div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Members paid</span>
              <span className="text-sm font-medium">{paidMembers}/{totalMembers}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="flex flex-wrap -space-x-3">
            {group.members.map((member, index) => (
              <Avatar key={member.id} className={`border-2 ${member.paid ? 'border-green-500' : 'border-gray-200'}`}>
                <AvatarFallback className={member.paid ? 'bg-green-100 text-green-700' : ''}>
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
