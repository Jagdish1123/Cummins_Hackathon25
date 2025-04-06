import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import type { User, UserType, UserInput } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isAuthenticated: true;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (input: UserInput) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: true,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = localStorage.getItem("user");
        if (session) {
          setUser(JSON.parse(session));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);
  const dummyUser = {
    id: "dummy-id", // You can use a UUID or any unique identifier
    email: "testuser@example.com",
    name: "Test User",
    userType: "regular", // Adjust based on your user types
    avatar: "", // Add a URL or path to an avatar image if needed
    creditScore: 700, // Example credit score
    preferences: {}, // Add any default preferences if applicable
  };

  const login = async (email: string, password: string) => {
    try {
      // Use dummy data for login
      if (email === dummyUser.email) {
        setUser(dummyUser);
        localStorage.setItem("user", JSON.stringify(dummyUser));
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    }
  };

  const logout = async () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
  };

  const signup = async ({
    email,
    password,
    name,
    userType,
    avatar,
  }: UserInput) => {
    try {
      // Replace MongoDB implementation with local storage approach
      // await connectToDatabase();
      // const newUser = new UserModel({...})
      // await newUser.save();

      const userData: User = {
        id: crypto.randomUUID(),
        name: name,
        email: email,
        userType: userType,
        creditScore: 70, // Default credit score
        avatar: avatar,
        preferences: {
          language: "en",
          currency: "INR",
          theme: "light",
        },
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Failed to create account. Please try again.");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
