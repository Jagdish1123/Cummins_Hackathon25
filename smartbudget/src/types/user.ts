// Define user type constants
export type UserType = "student" | "professional";

// Define the base user interface
export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  avatar?: string;
  creditScore: number;
  preferences?: {
    language: string;
    currency: string;
    theme: string;
  };
  created_at?: Date;
}

// Define input type for creating/updating users
export interface UserInput {
  name: string;
  email: string;
  password: string;
  userType: UserType;
  avatar?: string;
} 