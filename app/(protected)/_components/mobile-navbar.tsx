"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavbarProps } from "./navbar";

export const MobileNavbar = ({ pathname, sections }: NavbarProps) => (
  <nav className="fixed bottom-0 left-0 w-full z-50">
    {/* Background and Rounded Top */}
    <div className="relative bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)] border-t border-blue-200 px-4 py-2 flex justify-around items-center rounded-t-2xl">
      {sections.map(({ id, label, icon: Icon, link }) => {
        const isActive = pathname === link;

        return (
          <Link
            key={id}
            href={link}
            className={cn(
              "group flex flex-col items-center justify-center px-3 py-1 transition-all",
              isActive ? "text-blue-600 font-semibold" : "text-gray-500"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all",
                isActive
                  ? "bg-blue-100 shadow-inner"
                  : "bg-transparent group-hover:bg-gray-100"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  isActive
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-600"
                )}
              />
            </div>
            <span
              className={cn(
                "text-[10px] mt-1",
                isActive ? "text-blue-600" : "text-gray-400"
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  </nav>
);
