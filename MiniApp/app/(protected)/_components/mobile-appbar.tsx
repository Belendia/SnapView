"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { MobileDrawerContent } from "./mobile-drawer-content";
import { NavbarProps } from "./navbar";
import { ToolbarButtons } from "./toolbar-buttons";

export const MobileAppbar = ({ sections, pathname }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#00509d] to-[#155493] border-b border-blue-800 transition-shadow shadow-md z-50">
      <nav className="container flex justify-between items-center h-16 px-4">
        {/* Left: Hamburger Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="text-white">
            <MenuIcon className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <MobileDrawerContent
              sections={sections}
              pathname={pathname}
              closeDrawer={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>

        {/* Middle: Brand */}
        <div className="text-xl font-bold text-white">SnapView</div>

        {/* Right: Avatar */}
        <ToolbarButtons />
      </nav>
    </header>
  );
};
