"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout";

export const ToolbarButtons = () => {
  const handleLogout = () => {
    logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur shadow-md border border-white/20 w-9 h-9"
        >
          <Avatar className="w-8 h-8">
            {/* If user image exists, show it here */}
            <AvatarImage src="/user-avatar.png" alt="User" />
            {/* Fallback: User initials */}
            <AvatarFallback className="bg-white/30 text-sm text-white font-semibold">
              U
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
