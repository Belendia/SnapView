import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-300">
      <div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button className="w-full">Log out</Button>
        </form>
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
