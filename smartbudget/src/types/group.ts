// Define the member type
export interface GroupMember {
  id: string;
  name: string;
  paid: boolean;
  amount: number;
}

// Define the group status type
export type GroupStatus = "settled" | "pending" | "overdue";

// Define the main group type
export interface Group {
  id: string;
  name: string;
  description?: string;
  totalAmount: number;
  date: string;
  members: GroupMember[];
  status: GroupStatus;
  category: string;
}

// Define the input type for creating a group
export interface CreateGroupInput {
  name: string;
  description?: string;
  category: string;
  totalAmount: number;
  date: Date;
  members: { name: string; email: string }[];
}

// Make sure to export everything needed
export type { Group, GroupMember, GroupStatus, CreateGroupInput };
