import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-300">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-4xl font-semibold text-black drop-shadow-md",
            font.className
          )}
        >
          🔐 Auth
        </h1>
        <p className="text-black text-lg">
          Please sign in to access your dashboards
        </p>
        <div>
          <LoginButton asChild>
            <Button variant="default" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
