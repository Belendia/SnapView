"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTelegramUser } from "@/hooks/telegram";
import { validatePasscode } from "@/actions/bridge";

export default function LoginPage() {
  const tgUser = useTelegramUser();
  const [digits, setDigits] = useState(Array(6).fill(""));
  const [isPending, startTransition] = useTransition();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = () => {
    const passcode = digits.join("");

    if (passcode.length !== 6) {
      toast.error("Please enter your full 6-digit passcode.");
      return;
    }

    if (!tgUser?.id) {
      toast.error("Telegram user not found.");
      return;
    }

    startTransition(async () => {
      const result = await validatePasscode(tgUser.id.toString(), passcode);

      if (result.success) {
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        toast.error(result.error || "Login failed");
        setDigits(Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter your 6-digit passcode to continue
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-6"
        >
          <div className="flex justify-between gap-2">
            {digits.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                className="w-12 h-12 text-center text-xl font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={(e) => e.target.select()}
                type="text"
                inputMode="numeric"
              />
            ))}
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-blue-500 text-white text-base font-semibold rounded-md hover:bg-blue-600 transition-all"
            disabled={isPending || digits.includes("")}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          {/* Optional custom footer instead of forgot/create */}
          <div className="text-center text-xs text-gray-400">
            For support, contact admin@example.com
          </div>
        </form>
      </div>
    </div>
  );
}
