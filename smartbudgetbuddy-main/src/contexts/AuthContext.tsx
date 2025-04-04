
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export type UserType = "student" | "professional";

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  avatar?: string;
  creditScore: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string, userType: UserType) => Promise<void>;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user data
const MOCK_USERS = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    password: "password123",
    userType: "professional" as UserType,
    avatar: "https://i.pravatar.cc/150?img=12",
    creditScore: 85
  },
  {
    id: "2",
    name: "Jamie Smith",
    email: "jamie@example.com",
    password: "password123",
    userType: "student" as UserType,
    avatar: "https://i.pravatar.cc/150?img=13",
    creditScore: 75
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      toast.success("Logged in successfully!");
    } else {
      toast.error("Invalid email or password");
      throw new Error("Invalid email or password");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
  };

  const signup = async (name: string, email: string, password: string, userType: UserType) => {
    // Mock signup
    if (MOCK_USERS.some(u => u.email === email)) {
      toast.error("Email already in use");
      throw new Error("Email already in use");
    }

    const newUser = {
      id: Math.random().toString(36).substring(2, 11),
      name,
      email,
      userType,
      creditScore: 70, // Default credit score for new users
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };

    // In a real app, you would send this to an API
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(newUser));
    toast.success("Account created successfully!");
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        signup,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
