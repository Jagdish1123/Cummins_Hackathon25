import React, { useState } from "react";
import { Check, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserOption {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
}

interface UserSelectionListProps {
  users: UserOption[];
  selectedUsers: UserOption[];
  onUserSelect: (users: UserOption[]) => void;
}

export function UserSelectionList({
  users,
  selectedUsers,
  onUserSelect,
}: UserSelectionListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUser = (user: UserOption) => {
    const isSelected = selectedUsers.some(
      (selected) => selected.id === user.id
    );

    let newSelectedUsers;
    if (isSelected) {
      newSelectedUsers = selectedUsers.filter(
        (selected) => selected.id !== user.id
      );
    } else {
      newSelectedUsers = [...selectedUsers, user];
    }

    onUserSelect(newSelectedUsers);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="search-users">Search Users</Label>
        <Input
          id="search-users"
          placeholder="Type a name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="border rounded-md">
        <ScrollArea className="h-[200px]">
          <div className="p-2 space-y-1">
            {filteredUsers.length === 0 ? (
              <div className="py-2 px-3 text-center text-muted-foreground">
                No users found
              </div>
            ) : (
              filteredUsers.map((user) => {
                const isSelected = selectedUsers.some(
                  (selected) => selected.id === user.id
                );
                return (
                  <div
                    key={user.id}
                    className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      isSelected ? "bg-gray-100 dark:bg-gray-800" : ""
                    }`}
                    onClick={() => toggleUser(user)}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleUser(user)}
                      id={`user-${user.id}`}
                    />
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <Label
                      htmlFor={`user-${user.id}`}
                      className="flex-1 cursor-pointer"
                    >
                      {user.name}
                    </Label>
                    {isSelected && <Check className="h-4 w-4 text-primary" />}
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">
          Selected ({selectedUsers.length})
        </p>
        <div className="flex flex-wrap gap-2">
          {selectedUsers.map((user) => (
            <div
              key={user.id}
              className="inline-flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
            >
              {user.name}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 ml-1"
                onClick={() => toggleUser(user)}
              >
                <span className="sr-only">Remove</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                >
                  <path
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
