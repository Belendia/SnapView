import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { getTranslations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const locale = (await searchParams)?.locale ?? "en";
  const translations = await getTranslations(locale);

  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-300">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-4xl font-semibold text-black drop-shadow-md",
            font.className
          )}
        >
          🔐 {translations.auth}
        </h1>
        <p className="text-black text-lg">{translations.pleaseLogIn}</p>
        <div>
          <LoginButton asChild>
            <Button variant="default" size="lg">
              Log in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
