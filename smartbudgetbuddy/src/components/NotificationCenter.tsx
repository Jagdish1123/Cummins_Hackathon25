
import { useState } from "react";
import { useNotifications, Notification } from "@/contexts/NotificationContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Check, Info, AlertTriangle, AlertCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export function NotificationCenter() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      // Don't mark as read immediately, let user see what's new
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.action) {
      notification.action.onClick();
    }
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="font-medium">Notifications</h3>
          {notifications.length > 0 && (
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-xs"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={clearAll}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        {notifications.length > 0 ? (
          <ScrollArea className="h-[300px]">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex gap-3 border-b p-4 cursor-pointer transition-colors hover:bg-muted/50",
                  !notification.isRead && "bg-muted/30"
                )}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={cn("text-sm font-medium", !notification.isRead && "font-semibold")}>
                      {notification.title}
                    </h4>
                    <button
                      className="text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </span>
                    {notification.action && (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="h-auto p-0 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          notification.action?.onClick();
                          markAsRead(notification.id);
                        }}
                      >
                        {notification.action.label}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <Bell className="mb-2 h-10 w-10 text-muted" />
            <h4 className="text-sm font-medium">No notifications</h4>
            <p className="text-xs text-muted-foreground">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
