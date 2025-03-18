// import { signOut } from "@/auth";
"use client";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const onClick = () => {
    logout();
  };
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-300">
      <div>
        <Button className="w-full" onClick={onClick}>
          Log out
        </Button>
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
