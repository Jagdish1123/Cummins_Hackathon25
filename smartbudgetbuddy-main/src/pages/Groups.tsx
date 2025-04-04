
import { useState } from "react";
import Navbar from "@/components/Navbar";
import GroupCard, { Group, GroupMember } from "@/components/GroupCard";
import CreateGroupModal from "@/components/CreateGroupModal";
import SettlementModal from "@/components/SettlementModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
  SendHorizonal
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for demonstration
const mockGroups: Group[] = [
  {
    id: "1",
    name: "Weekend Trip to Mountains",
    description: "Cabin rental and activities",
    totalAmount: 750,
    date: "2023-05-25",
    members: [
      { id: "m1", name: "Alex", paid: true, amount: 187.5 },
      { id: "m2", name: "Jordan", paid: true, amount: 187.5 },
      { id: "m3", name: "Taylor", paid: false, amount: 187.5 },
      { id: "m4", name: "Morgan", paid: false, amount: 187.5 }
    ],
    status: "pending",
    category: "Trip"
  },
  {
    id: "2",
    name: "Dinner at Italian Restaurant",
    totalAmount: 240,
    date: "2023-06-12",
    members: [
      { id: "m1", name: "Alex", paid: true, amount: 80 },
      { id: "m2", name: "Riley", paid: false, amount: 80 },
      { id: "m5", name: "Casey", paid: true, amount: 80 }
    ],
    status: "pending",
    category: "Dinner"
  },
  {
    id: "3",
    name: "Movie Night",
    totalAmount: 120,
    date: "2023-06-08",
    members: [
      { id: "m1", name: "Alex", paid: true, amount: 30 },
      { id: "m2", name: "Riley", paid: true, amount: 30 },
      { id: "m3", name: "Taylor", paid: true, amount: 30 },
      { id: "m5", name: "Casey", paid: true, amount: 30 }
    ],
    status: "settled",
    category: "Event"
  },
  {
    id: "4",
    name: "Apartment Rent & Utilities",
    description: "Monthly apartment expenses",
    totalAmount: 1800,
    date: "2023-06-01",
    members: [
      { id: "m1", name: "Alex", paid: true, amount: 600 },
      { id: "m2", name: "Jordan", paid: true, amount: 600 },
      { id: "m3", name: "Taylor", paid: false, amount: 600 }
    ],
    status: "overdue",
    category: "Roommates"
  },
  {
    id: "5",
    name: "Concert Tickets",
    totalAmount: 350,
    date: "2023-05-15",
    members: [
      { id: "m1", name: "Alex", paid: true, amount: 175 },
      { id: "m5", name: "Casey", paid: true, amount: 175 }
    ],
    status: "settled",
    category: "Event"
  }
];

const allMembers = [
  { id: "m1", name: "Alex", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "m2", name: "Jordan", avatar: "https://i.pravatar.cc/150?img=13" },
  { id: "m3", name: "Taylor", avatar: "https://i.pravatar.cc/150?img=14" },
  { id: "m4", name: "Morgan", avatar: "https://i.pravatar.cc/150?img=15" },
  { id: "m5", name: "Casey", avatar: "https://i.pravatar.cc/150?img=16" }
];

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isSettlementModalOpen, setIsSettlementModalOpen] = useState(false);

  // Filter groups based on search query
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (group.description && group.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get groups by status
  const pendingGroups = filteredGroups.filter(group => group.status === "pending");
  const settledGroups = filteredGroups.filter(group => group.status === "settled");
  const overdueGroups = filteredGroups.filter(group => group.status === "overdue");

  // Handle creating a new group
  const handleCreateGroup = (group: {
    name: string;
    description: string;
    category: string;
    totalAmount: number;
    date: Date;
    members: { name: string; email: string }[];
  }) => {
    const perPersonAmount = group.totalAmount / group.members.length;
    
    const groupMembers: GroupMember[] = group.members.map(member => {
      // Find if member already exists in our system
      const existingMember = allMembers.find(m => 
        m.name.toLowerCase() === member.name.toLowerCase()
      );
      
      return {
        id: existingMember?.id || uuidv4(),
        name: member.name,
        avatar: existingMember?.avatar,
        paid: false,
        amount: perPersonAmount
      };
    });
    
    const newGroup: Group = {
      id: uuidv4(),
      name: group.name,
      description: group.description,
      category: group.category,
      totalAmount: group.totalAmount,
      date: group.date.toISOString().split("T")[0],
      members: groupMembers,
      status: "pending" as "pending" | "settled" | "overdue",
    };
    
    setGroups([newGroup, ...groups]);
    toast.success("Group created successfully!");
  };

  // Handle settling a payment
  const handleSettlePayment = (memberId: string, paymentMethod: string) => {
    if (!selectedGroup) return;
    
    const updatedGroups = groups.map(group => {
      if (group.id === selectedGroup.id) {
        const updatedMembers = group.members.map(member => {
          if (member.id === memberId) {
            return { ...member, paid: true };
          }
          return member;
        });
        
        // Check if all members have paid
        const allPaid = updatedMembers.every(member => member.paid);
        
        return { 
          ...group, 
          members: updatedMembers,
          status: allPaid ? ("settled" as "pending" | "settled" | "overdue") : ("pending" as "pending" | "settled" | "overdue")
        };
      }
      return group;
    });
    
    setGroups(updatedGroups);
    
    // Update selected group
    const updatedSelectedGroup = updatedGroups.find(g => g.id === selectedGroup.id);
    if (updatedSelectedGroup) {
      setSelectedGroup(updatedSelectedGroup);
    }
  };

  // Open settlement modal for a group
  const openSettlementModal = (group: Group) => {
    setSelectedGroup(group);
    setIsSettlementModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Group Expenses</h1>
                <p className="text-muted-foreground">Manage shared expenses with friends and family</p>
              </div>
              <CreateGroupModal onCreateGroup={handleCreateGroup} />
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search groups..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="animate-fade-in">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Pending Settlements</CardTitle>
                <CardDescription>Groups waiting for payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <span className="text-3xl font-bold">{pendingGroups.length}</span>
                    <span className="text-muted-foreground ml-2">groups</span>
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  <span className="text-muted-foreground">
                    Total pending: {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(pendingGroups.reduce((sum, group) => {
                      const unpaidAmount = group.members
                        .filter(member => !member.paid && member.amount)
                        .reduce((total, member) => total + (member.amount || 0), 0);
                      return sum + unpaidAmount;
                    }, 0))}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Settled Groups</CardTitle>
                <CardDescription>Completed settlements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <span className="text-3xl font-bold">{settledGroups.length}</span>
                    <span className="text-muted-foreground ml-2">groups</span>
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  <span className="text-muted-foreground">
                    Total settled: {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(settledGroups.reduce((sum, group) => sum + group.totalAmount, 0))}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Overdue Payments</CardTitle>
                <CardDescription>Past due settlements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <span className="text-3xl font-bold">{overdueGroups.length}</span>
                    <span className="text-muted-foreground ml-2">groups</span>
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  <span className="text-muted-foreground">
                    Total overdue: {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(overdueGroups.reduce((sum, group) => {
                      const unpaidAmount = group.members
                        .filter(member => !member.paid && member.amount)
                        .reduce((total, member) => total + (member.amount || 0), 0);
                      return sum + unpaidAmount;
                    }, 0))}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Group Expenses Tabs */}
          <div>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Groups</TabsTrigger>
                <TabsTrigger value="pending">
                  Pending
                  {pendingGroups.length > 0 && (
                    <span className="ml-1 bg-amber-100 text-amber-700 text-xs rounded-full px-2">
                      {pendingGroups.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="settled">Settled</TabsTrigger>
                <TabsTrigger value="overdue">
                  Overdue
                  {overdueGroups.length > 0 && (
                    <span className="ml-1 bg-red-100 text-red-700 text-xs rounded-full px-2">
                      {overdueGroups.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredGroups.length > 0 ? (
                    filteredGroups.map((group) => (
                      <div key={group.id} onClick={() => openSettlementModal(group)} className="cursor-pointer">
                        <GroupCard group={group} />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full flex items-center justify-center py-12 text-center">
                      <div>
                        <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">No Groups Found</h3>
                        <p className="text-muted-foreground max-w-md mb-6">
                          You haven't created any group expenses yet, or your search didn't match any groups.
                        </p>
                        <CreateGroupModal onCreateGroup={handleCreateGroup} />
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="pending" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingGroups.length > 0 ? (
                    pendingGroups.map((group) => (
                      <div key={group.id} onClick={() => openSettlementModal(group)} className="cursor-pointer">
                        <GroupCard group={group} />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full flex items-center justify-center py-12 text-center">
                      <div>
                        <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">No Pending Groups</h3>
                        <p className="text-muted-foreground max-w-md">
                          All your group expenses are either settled or overdue.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="settled" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {settledGroups.length > 0 ? (
                    settledGroups.map((group) => (
                      <div key={group.id} onClick={() => openSettlementModal(group)} className="cursor-pointer">
                        <GroupCard group={group} />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full flex items-center justify-center py-12 text-center">
                      <div>
                        <div className="mx-auto h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                          <Clock className="h-6 w-6 text-amber-600" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">No Settled Groups</h3>
                        <p className="text-muted-foreground max-w-md">
                          You don't have any fully settled group expenses yet.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="overdue" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {overdueGroups.length > 0 ? (
                    overdueGroups.map((group) => (
                      <div key={group.id} onClick={() => openSettlementModal(group)} className="cursor-pointer">
                        <GroupCard group={group} />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full flex items-center justify-center py-12 text-center">
                      <div>
                        <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">No Overdue Groups</h3>
                        <p className="text-muted-foreground max-w-md">
                          Great! You don't have any overdue group payments.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Tips Section */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">Group Expense Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Split Expenses Fairly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Use our equal split or custom amount features to ensure everyone contributes their fair share.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <Share2 className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Share Settlement Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Send payment requests directly through the app with our automated reminders.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Keep Everyone in the Loop</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Use the group chat feature to discuss expenses and keep communication transparent.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Settlement Modal */}
          {selectedGroup && (
            <SettlementModal
              isOpen={isSettlementModalOpen}
              onClose={() => setIsSettlementModalOpen(false)}
              members={selectedGroup.members}
              groupName={selectedGroup.name}
              onSettlePayment={handleSettlePayment}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Groups;
