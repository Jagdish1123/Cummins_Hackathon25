import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useLanguage } from "./LanguageContext";

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  date: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, "id" | "date" | "read">
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

// Smart alerts that were previously in Financial Advisor
const smartAlerts = [
  {
    type: "warning" as NotificationType,
    title: "Unusual Spending",
    message: "Your dining expenses are 40% higher than last month.",
  },
  {
    type: "info" as NotificationType,
    title: "Savings Opportunity",
    message: "You could save ₹8,000 by reducing subscription services.",
  },
  {
    type: "success" as NotificationType,
    title: "Budget Goal Progress",
    message: "You're on track to meet your savings goal this month!",
  },
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { t } = useLanguage();

  // Add smart alerts as notifications on component mount
  useEffect(() => {
    // Add the smart alerts as notifications when the component mounts
    smartAlerts.forEach((alert) => {
      const id = Math.random().toString(36).substring(2, 9);
      const notification = {
        id,
        type: alert.type,
        title: t(alert.title),
        message: t(alert.message),
        read: false,
        date: new Date(),
      };

      setNotifications((prev) => [...prev, notification]);

      // Also show as toast
      toast[alert.type](t(alert.title), {
        description: t(alert.message),
      });
    });
  }, [t]);

  const addNotification = (
    notification: Omit<Notification, "id" | "date" | "read">
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification = {
      ...notification,
      id,
      read: false,
      date: new Date(),
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Show toast notification
    toast[notification.type](t(notification.title), {
      description: t(notification.message),
    });
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
