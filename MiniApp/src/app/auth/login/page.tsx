"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="flex min-h-screen items-center justify-center px-4 bg-white">
      <Card className="w-full max-w-sm shadow-sm border">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Login
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground mt-1">
            Enter your 6-digit passcode
          </p>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="space-y-6"
          >
            <div className="flex justify-center gap-2">
              {digits.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el: HTMLInputElement | null) => {
                    inputRefs.current[index] = el;
                  }}
                  className="w-11 h-12 text-center text-2xl font-semibold"
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
              className="w-full"
              disabled={isPending || digits.includes("")}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
