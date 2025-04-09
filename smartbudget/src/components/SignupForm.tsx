
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { GraduationCap, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { useLanguage } from "@/contexts/LanguageContext";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export function SignupForm() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"student" | "professional">("student");
  const { language } = useLanguage();

  const translations = {
    en: {
      student: "Student",
      professional: "Professional",
      fullName: "Full Name",
      email: "Email",
      password: "Password",
      nameInput: "Enter your name",
      emailInput: "Enter your email",
      passwordInput: "Create a password",
      creating: "Creating account...",
      createAccount: "Create Account",
      iAmA: "I am a:",
      successMessage: "Account created! Welcome to SmartBudget.",
    },
    mr: {
      student: "विद्यार्थी",
      professional: "व्यावसायिक",
      fullName: "पूर्ण नाव",
      email: "ईमेल",
      password: "पासवर्ड",
      nameInput: "आपले नाव प्रविष्ट करा",
      emailInput: "आपला ईमेल प्रविष्ट करा",
      passwordInput: "पासवर्ड तयार करा",
      creating: "खाते तयार करत आहे...",
      createAccount: "खाते तयार करा",
      iAmA: "मी आहे:",
      successMessage: "खाते तयार केले! स्मार्टबजेटमध्ये आपले स्वागत आहे.",
    },
  };

  const t = translations[language];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await signup(values.name, values.email, values.password, userType);
      toast.success(t.successMessage);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t.iAmA}</label>
            <div className="grid grid-cols-2 gap-4">
              <Toggle
                pressed={userType === "student"}
                onPressedChange={() => setUserType("student")}
                className="flex flex-col items-center justify-center p-4 h-auto data-[state=on]:bg-primary/10 dark:data-[state=on]:bg-primary/20"
              >
                <GraduationCap className="h-6 w-6 mb-2" />
                <span>{t.student}</span>
              </Toggle>
              
              <Toggle
                pressed={userType === "professional"}
                onPressedChange={() => setUserType("professional")}
                className="flex flex-col items-center justify-center p-4 h-auto data-[state=on]:bg-primary/10 dark:data-[state=on]:bg-primary/20"
              >
                <Briefcase className="h-6 w-6 mb-2" />
                <span>{t.professional}</span>
              </Toggle>
            </div>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.fullName}</FormLabel>
                <FormControl>
                  <Input placeholder={t.nameInput} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.email}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={t.emailInput} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.password}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t.passwordInput}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t.creating : t.createAccount}
        </Button>
      </form>
    </Form>
  );
}
