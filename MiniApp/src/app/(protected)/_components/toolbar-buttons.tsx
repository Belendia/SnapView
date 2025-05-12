"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTelegramUser } from "@/hooks/telegram";
import { logout } from "@/actions/auth";

export const ToolbarButtons = () => {
  const tgUser = useTelegramUser();

  const photoUrl = tgUser?.photoUrl ?? "/user-avatar.png";
  const initials =
    (
      (tgUser?.firstName?.[0] ?? "") + (tgUser?.lastName?.[0] ?? "")
    ).toUpperCase() || "U";

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
            <AvatarImage
              key={photoUrl}
              src={photoUrl}
              alt={tgUser?.username ?? "User"}
            />
            <AvatarFallback className="bg-white/30 text-sm text-white font-semibold">
              {initials}
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
