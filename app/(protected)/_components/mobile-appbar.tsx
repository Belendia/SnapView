import Link from "next/link";
import { ToolbarButtons } from "./toolbar-buttons";

export const MobileAppbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#00509d] to-[#155493] border-b border-blue-800 transition-shadow shadow-md z-50">
      <nav className="container flex justify-between items-center h-16 px-6">
        <Link href="/" className="text-xl font-bold text-white">
          SnapView
        </Link>
        <ToolbarButtons />
      </nav>
    </header>
  );
};
