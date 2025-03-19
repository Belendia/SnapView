import Link from "next/link";
import { cn } from "@/lib/utils";
import { PersonIcon } from "@radix-ui/react-icons";

import { NavbarProps } from "./navbar";

export const DesktopNavbar = ({ pathname, sections }: NavbarProps) => (
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
      <div className="w-10 h-10 flex items-center justify-center border border-white rounded-full bg-[#004a8f] shadow-md">
        <PersonIcon className="w-6 h-6 text-white" />
      </div>
    </nav>
  </header>
);
