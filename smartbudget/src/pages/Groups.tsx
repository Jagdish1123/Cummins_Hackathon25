import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import { GroupCard } from "@/components/GroupCard";
import CreateGroupModal from "@/components/CreateGroupModal";
import SettlementModal from "@/components/SettlementModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  CalendarDays,
  DollarSign,
  Share2,
  MessageSquare,
  SendHorizonal,
  Wallet,
  Send,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PaymentInterface } from "@/components/PaymentInterface";
import { GroupExpense } from "@/types/payment";
import type { Group, GroupMember, CreateGroupInput } from "@/types/group";
import { useNotification } from "@/contexts/NotificationContext";

// Mock data for demonstration - expanded with more groups
const mockGroups: Group[] = [
  {
    id: "1",
    name: "Weekend Trip to Mountains",
    description: "Cabin rental and activities",
    totalAmount: 12500,
    date: "2023-05-25",
    members: [
      {
        id: "m1",
        name: "Alex",
        paid: true,
        amount: 3125,
      },
      {
        id: "m2",
        name: "Jordan",
        paid: true,
        amount: 3125,
      },
      {
        id: "m3",
        name: "Taylor",
        paid: false,
        amount: 3125,
      },
      {
        id: "m4",
        name: "Morgan",
        paid: false,
        amount: 3125,
      },
    ],
    status: "pending",
    category: "Trip",
  },
  {
    id: "2",
    name: "Dinner at Italian Restaurant",
    totalAmount: 4800,
    date: "2023-06-12",
    members: [
      {
        id: "m1",
        name: "Alex",
        paid: true,
        amount: 1600,
      },
      {
        id: "m2",
        name: "Riley",
        paid: false,
        amount: 1600,
      },
      {
        id: "m5",
        name: "Casey",
        paid: true,
        amount: 1600,
      },
    ],
    status: "pending",
    category: "Food",
    description: "Dinner and drinks",
  },
  {
    id: "3",
    name: "Movie Night",
    description: "Tickets and snacks for the new action movie",
    totalAmount: 3200,
    date: "2023-07-15",
    members: [
      {
        id: "m1",
        name: "Alex",
        paid: true,
        amount: 800,
      },
      {
        id: "m2",
        name: "Jordan",
        paid: true,
        amount: 800,
      },
      {
        id: "m3",
        name: "Taylor",
        paid: true,
        amount: 800,
      },
      {
        id: "m5",
        name: "Casey",
        paid: false,
        amount: 800,
      },
    ],
    status: "settled",
    category: "Entertainment",
  },
  {
    id: "4",
    name: "Monthly Apartment Utilities",
    description: "Electricity, water, and internet",
    totalAmount: 6500,
    date: "2023-08-01",
    members: [
      {
        id: "m1",
        name: "Alex",
        paid: true,
        amount: 2166.67,
      },
      {
        id: "m2",
        name: "Jordan",
        paid: false,
        amount: 2166.67,
      },
      {
        id: "m5",
        name: "Casey",
        paid: false,
        amount: 2166.67,
      },
    ],
    status: "overdue",
    category: "Utilities",
  },
  {
    id: "5",
    name: "Bachelor Party",
    description: "Weekend celebration for Sam's wedding",
    totalAmount: 25000,
    date: "2023-09-05",
    members: [
      {
        id: "m1",
        name: "Alex",
        paid: true,
        amount: 5000,
      },
      {
        id: "m2",
        name: "Jordan",
        paid: true,
        amount: 5000,
      },
      {
        id: "m3",
        name: "Taylor",
        paid: true,
        amount: 5000,
      },
      {
        id: "m4",
        name: "Morgan",
        paid: false,
        amount: 5000,
      },
      {
        id: "m5",
        name: "Casey",
        paid: false,
        amount: 5000,
      },
    ],
    status: "pending",
    category: "Event",
  },
  {
    id: "6",
    name: "Group Gift for Manager",
    description: "Retirement gift collection",
    totalAmount: 7500,
    date: "2023-09-20",
    members: [
      {
        id: "m1",
        name: "Alex",
        paid: true,
        amount: 1500,
      },
      {
        id: "m2",
        name: "Jordan",
        paid: true,
        amount: 1500,
      },
      {
        id: "m3",
        name: "Taylor",
        paid: true,
        amount: 1500,
      },
      {
        id: "m4",
        name: "Morgan",
        paid: true,
        amount: 1500,
      },
      {
        id: "m5",
        name: "Casey",
        paid: true,
        amount: 1500,
      },
    ],
    status: "settled",
    category: "Gift",
  },
  {
    id: "7",
    name: "Office Party Supplies",
    description: "Decorations, food, and drinks for office celebration",
    totalAmount: 9000,
    date: "2023-10-10",
    members: [
      {
        id: "m1",
        name: "Alex",
        paid: true,
        amount: 3000,
      },
      {
        id: "m3",
        name: "Taylor",
        paid: false,
        amount: 3000,
      },
      {
        id: "m5",
        name: "Casey",
        paid: false,
        amount: 3000,
      },
    ],
    status: "pending",
    category: "Office",
  },
];

const Groups = () => {
  const { t } = useLanguage();
  const { addNotification } = useNotification();
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "settled" | "pending" | "overdue"
  >("all");

  // State for modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSettlementModalOpen, setIsSettlementModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  // Load groups on initial render
  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setGroups(mockGroups);
      setFilteredGroups(mockGroups);
      setIsLoading(false);
    }, 800);
  }, []);

  // Handle search filter
  useEffect(() => {
    let result = groups;

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (group) =>
          group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (selectedStatus !== "all") {
      result = result.filter((group) => group.status === selectedStatus);
    }

    setFilteredGroups(result);
  }, [searchQuery, selectedStatus, groups]);

  // Handle creating a new group
  const handleCreateGroup = (groupData: CreateGroupInput) => {
    // Create new group with unique ID
    const newGroup: Group = {
      id: uuidv4(),
      name: groupData.name,
      description: groupData.description,
      totalAmount: groupData.totalAmount,
      date: groupData.date.toISOString(),
      members: groupData.members.map((member) => ({
        id: uuidv4(),
        name: member.name,
        paid: false,
        amount: groupData.totalAmount / groupData.members.length, // Equal split
      })),
      status: "pending",
      category: groupData.category,
    };

    // Update state with new group
    setGroups((prevGroups) => [newGroup, ...prevGroups]);

    // Close modal and show success notification
    setIsCreateModalOpen(false);

    // Use notification system
    addNotification({
      type: "success",
      title: t("Group Created"),
      message: t("Your new group has been created successfully."),
    });
  };

  // Handle opening settlement modal
  const handleOpenSettlement = (group: Group) => {
    setSelectedGroup(group);
    setIsSettlementModalOpen(true);
  };

  // Handle settling a payment
  const handleSettlePayment = (memberId: string, paymentMethod: string) => {
    if (!selectedGroup) return;

    // Update the group with the member marked as paid
    const updatedGroups = groups.map((group) => {
      if (group.id === selectedGroup.id) {
        const updatedMembers = group.members.map((member) => {
          if (member.id === memberId) {
            return { ...member, paid: true };
          }
          return member;
        });

        // Check if all members have paid to update status
        const allPaid = updatedMembers.every((member) => member.paid);

        return {
          ...group,
          members: updatedMembers,
          status: allPaid ? "settled" : group.status,
        };
      }
      return group;
    });

    // Update state and close modal
    setGroups(updatedGroups);
    setIsSettlementModalOpen(false);

    // Show success notification
    addNotification({
      type: "success",
      title: t("Payment Settled"),
      message: t("The payment has been marked as settled."),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{t("Groups")}</h1>
          <Button onClick={() => setIsCreateModalOpen(true)} className="gap-1">
            <Plus className="h-4 w-4" />
            {t("Create Group")}
          </Button>
        </div>

        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t("Search groups...")}
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Tabs
                value={selectedStatus}
                onValueChange={(value) =>
                  setSelectedStatus(
                    value as "all" | "settled" | "pending" | "overdue"
                  )
                }
                className="w-full md:w-auto"
              >
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="all">{t("All")}</TabsTrigger>
                  <TabsTrigger value="settled">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {t("Settled")}
                  </TabsTrigger>
                  <TabsTrigger value="pending">
                    <Clock className="h-3 w-3 mr-1" />
                    {t("Pending")}
                  </TabsTrigger>
                  <TabsTrigger value="overdue">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {t("Overdue")}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border rounded-lg p-6 shadow-sm animate-pulse"
                >
                  <div className="h-6 bg-muted rounded mb-4 w-3/4"></div>
                  <div className="h-4 bg-muted rounded mb-2 w-1/2"></div>
                  <div className="h-4 bg-muted rounded mb-4 w-1/3"></div>
                  <div className="h-8 bg-muted rounded mb-4 w-full"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-muted rounded w-1/4"></div>
                    <div className="h-6 bg-muted rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredGroups.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block p-3 rounded-full bg-muted mb-4">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                {t("No groups found")}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t(
                  "Try adjusting your search or filter settings, or create a new group."
                )}
              </p>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                {t("Create Group")}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  onClick={() => handleOpenSettlement(group)}
                />
              ))}
            </div>
          )}

          {/* Feature descriptions */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">
              {t("Group Expense Features")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">
                    {t("Split Expenses Fairly")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t(
                      "Use our equal split or custom amount features to ensure everyone contributes their fair share."
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <Share2 className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">
                    {t("Share Settlement Links")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t(
                      "Send payment requests directly through the app with our automated reminders."
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">
                    {t("Keep Everyone in the Loop")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t(
                      "Use the group chat feature to discuss expenses and keep communication transparent."
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                    <SendHorizonal className="h-5 w-5 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">
                    {t("Instant Transfers")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t(
                      "Connect your payment methods for quick and easy settlements directly through the app."
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                    <CalendarDays className="h-5 w-5 text-red-600" />
                  </div>
                  <CardTitle className="text-lg">
                    {t("Payment Reminders")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t(
                      "Set up automated reminders to help group members remember to settle their payments on time."
                    )}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                    <Wallet className="h-5 w-5 text-indigo-600" />
                  </div>
                  <CardTitle className="text-lg">
                    {t("Expense Tracking")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t(
                      "Keep track of all group expenses in one place with detailed history and breakdown."
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreateGroupModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateGroup={handleCreateGroup}
        availableUsers={[
          { id: "1", name: "John Doe", email: "john@example.com" },
          { id: "2", name: "Jane Smith", email: "jane@example.com" },
          { id: "3", name: "Bob Johnson", email: "bob@example.com" },
        ]}
      />

      <SettlementModal
        isOpen={isSettlementModalOpen}
        onClose={() => setIsSettlementModalOpen(false)}
        group={selectedGroup}
        onSettle={handleSettlePayment}
      />
    </div>
  );
};

export default Groups;
