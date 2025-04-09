import React, { useState } from "react";
import { Bell } from "lucide-react";
import { useNotification } from "@/contexts/NotificationContext";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  Info,
  AlertTriangle,
  XCircle,
  X,
  Check,
} from "lucide-react";

export function NotificationCenter() {
  const { t } = useLanguage();
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    unreadCount,
  } = useNotification();
  const [open, setOpen] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "short",
    }).format(date);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => setOpen(true)}
        >
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between p-4 pb-2">
          <h3 className="font-medium">{t("Notifications")}</h3>
          {notifications.length > 0 && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => {
                  markAllAsRead();
                }}
              >
                <Check className="mr-1 h-3 w-3" />
                {t("Mark all as read")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => {
                  clearAll();
                }}
              >
                <X className="mr-1 h-3 w-3" />
                {t("Clear all")}
              </Button>
            </div>
          )}
        </div>
        <Separator />
        {notifications.length === 0 ? (
          <div className="flex h-32 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              {t("No notifications")}
            </p>
          </div>
        ) : (
          <ScrollArea className="max-h-[300px]">
            <div className="flex flex-col gap-1 p-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted",
                    !notification.read && "bg-muted/50"
                  )}
                >
                  <div className="mt-1">{getIcon(notification.type)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">
                        {notification.title}
                      </h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">{t("Remove")}</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-[10px] text-muted-foreground">
                        {formatDate(notification.date)}
                      </p>
                      {!notification.read && (
                        <Badge
                          variant="outline"
                          className="h-5 px-1 text-[10px]"
                        >
                          {t("New")}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
}
