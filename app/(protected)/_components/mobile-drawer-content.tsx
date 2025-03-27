"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavbarProps } from "./navbar";

export const MobileDrawerContent = ({
  sections,
  pathname,
  closeDrawer,
}: NavbarProps) => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      {sections.map(({ id, label, icon: Icon, link }) => {
        const isActive = pathname === link;
        return (
          <Link
            key={id}
            href={link}
            onClick={() => closeDrawer?.()}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-all",
              isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
            )}
          >
            <Icon
              className={cn(
                "w-5 h-5",
                isActive ? "text-blue-600" : "text-gray-500"
              )}
            />
            <span className="text-sm font-medium">{label}</span>
          </Link>
        );
      })}
    </div>
  );
};
