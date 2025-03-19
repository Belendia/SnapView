import Link from "next/link";
import { cn } from "@/lib/utils";

import { NavbarProps } from "./navbar";

export const MobileNavbar = ({ pathname, sections }: NavbarProps) => (
  <nav className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-[#00509d] to-[#155493] border-t border-blue-800 p-3 flex justify-around items-center shadow-lg z-50">
    {sections.map(({ id, label, icon: Icon, link }) => (
      <Link
        key={id}
        href={link}
        className={cn(
          "flex flex-col items-center text-sm p-2 rounded-md",
          pathname === link ? "bg-[#004a8f] text-white" : "text-blue-200"
        )}
      >
        <Icon
          className={cn(
            "w-6 h-6",
            pathname === link ? "text-white" : "text-blue-300"
          )}
        />
        <span className="capitalize">{label}</span>
      </Link>
    ))}
  </nav>
);
