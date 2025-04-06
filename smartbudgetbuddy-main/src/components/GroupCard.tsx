
import { cn } from "@/lib/utils";
import { 
  Users, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
  paid?: boolean;
  amount?: number;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  totalAmount: number;
  date: string;
  members: GroupMember[];
  status: "settled" | "pending" | "overdue";
  category?: string;
}

interface GroupCardProps {
  group: Group;
  onClick?: () => void;
  className?: string;
}

const statusConfig = {
  settled: {
    icon: CheckCircle,
    text: "Settled",
    color: "text-green-500 bg-green-50"
  },
  pending: {
    icon: Clock,
    text: "Pending",
    color: "text-amber-500 bg-amber-50"
  },
  overdue: {
    icon: AlertCircle,
    text: "Overdue",
    color: "text-red-500 bg-red-50"
  }
};

const GroupCard = ({ group, onClick, className }: GroupCardProps) => {
  const formattedDate = new Date(group.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(group.totalAmount);

  const paidCount = group.members.filter(member => member.paid).length;
  const totalMembers = group.members.length;
  const StatusIcon = statusConfig[group.status].icon;

  return (
    <div 
      className={cn(
        "p-4 rounded-xl border bg-white shadow-subtle card-transition animate-fade-in",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">{group.name}</h3>
        <div className={cn(
          "px-2 py-1 rounded-full text-xs font-medium flex items-center",
          statusConfig[group.status].color
        )}>
          <StatusIcon className="w-3.5 h-3.5 mr-1" />
          {statusConfig[group.status].text}
        </div>
      </div>
      
      {group.description && (
        <p className="text-sm text-muted-foreground mb-3">{group.description}</p>
      )}
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <DollarSign className="w-4 h-4 mr-1" />
          <span className="font-semibold text-foreground">{formattedAmount}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{formattedDate}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex -space-x-2 mr-2">
            {group.members.slice(0, 3).map((member, i) => (
              <Avatar key={member.id} className={cn("w-8 h-8 border-2 border-white", member.paid ? "ring-1 ring-green-500" : "")}>
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {group.members.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-white">
                +{group.members.length - 3}
              </div>
            )}
          </div>
          <div className="text-sm text-muted-foreground flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{paidCount}/{totalMembers} paid</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
