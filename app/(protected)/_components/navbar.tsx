"use client";

import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  Pencil1Icon,
  DrawingPinIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import { DesktopAppbar } from "./desktop-appbar";

import { IconProps } from "@radix-ui/react-icons/dist/types";
import { MobileAppbar } from "./mobile-appbar";

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
  closeDrawer?: () => void;
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
    <>
      <MobileAppbar sections={sections} pathname={pathname} />
      {/* <MobileNavbar pathname={pathname} sections={sections} /> */}
    </>
  ) : (
    <DesktopAppbar pathname={pathname} sections={sections} />
  );
};
