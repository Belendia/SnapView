import Link from "next/link";
import { cn } from "@/lib/utils";

import { NavbarProps } from "./navbar";
import { ToolbarButtons } from "./toolbar-buttons";

export const DesktopNavbar = ({ pathname, sections }: NavbarProps) => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#00509d] to-[#155493] border-b border-blue-800 transition-shadow shadow-md z-50">
      <nav className="container flex justify-between items-center h-16 px-6">
        <Link href="/" className="text-xl font-bold text-white">
          SnapView
        </Link>
        <ul className="flex gap-6">
          {sections.map(({ id, label, link }) => (
            <li key={id}>
              <Link
                href={link}
                className={cn(
                  "px-4 py-2 transition-colors rounded-md",
                  pathname === link
                    ? "bg-[#004a8f] text-white"
                    : "text-blue-200 hover:bg-[#003f7f]"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <ToolbarButtons />
      </nav>
    </header>
  );
};
