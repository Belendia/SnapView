"use client";

import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  Pencil1Icon,
  DrawingPinIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";
import { IconProps } from "@radix-ui/react-icons/dist/types";

const sections = [
  { id: "home", label: "Home", icon: HomeIcon, link: "/dashboard" },
  { id: "data-entry", label: "Data Entry", icon: Pencil1Icon, link: "/client" },
  { id: "design", label: "Design", icon: DrawingPinIcon, link: "/server" },
  { id: "settings", label: "Settings", icon: GearIcon, link: "/settings" },
];

interface Section {
  id: string;
  label: string;
  icon: FC<IconProps>;
  link: string;
}

export type NavbarProps = {
  pathname: string;
  sections: Section[];
};

export const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? (
    <MobileNavbar pathname={pathname} sections={sections} />
  ) : (
    <DesktopNavbar pathname={pathname} sections={sections} />
  );
};
