"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useTelegramUser } from "@/hooks/telegram";

import { savePasscode } from "@/actions/passcode";
import { PasscodeSchema } from "@/schemas";

export default function SetPasscodePage() {
  const tgUser = useTelegramUser();
  const [step, setStep] = useState<"create" | "confirm">("create");
  const [originalPasscode, setOriginalPasscode] = useState("");
  const [digits, setDigits] = useState(Array(6).fill(""));
  const [isPending, startTransition] = useTransition();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof PasscodeSchema>>({
    resolver: zodResolver(PasscodeSchema),
    defaultValues: {
      telegramId: "",
      passcode: "",
    },
  });

  // Auto-focus the first input when step changes
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [step]);

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

  const handleRawSubmit = (data: z.infer<typeof PasscodeSchema>) => {
    startTransition(async () => {
      const result = await savePasscode({
        telegramId: data.telegramId,
        passcode: data.passcode,
      });

      if (result?.success) {
        toast.success("Passcode Saved", {
          description: "Your passcode has been successfully set.",
        });
        router.push("/settings");
      }
    });
  };

  const onSubmit = () => {
    const passcode = digits.join("");
    if (passcode.length !== 6) return;

    if (step === "create") {
      setOriginalPasscode(passcode);
      setDigits(Array(6).fill(""));
      setStep("confirm");
    } else if (step === "confirm") {
      if (passcode !== originalPasscode) {
        toast.error("Passcode Mismatch", {
          description: "The passcodes do not match. Try again.",
        });
        setDigits(Array(6).fill(""));
        setStep("create");
        return;
      }

      form.setValue("passcode", passcode, { shouldValidate: true });
      form.setValue("telegramId", tgUser?.id.toString() || "", {
        shouldValidate: true,
      });

      form.handleSubmit(handleRawSubmit)();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            {step === "create" ? "Set Your Passcode" : "Confirm Passcode"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="passcode"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-center gap-1 sm:gap-2">
                        {digits.map((digit, index) => (
                          <Input
                            key={index}
                            ref={(el: HTMLInputElement | null) => {
                              inputRefs.current[index] = el;
                            }}
                            className="w-10 h-12 text-center text-xl font-bold px-0"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handleChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onFocus={(e) => e.target.select()}
                            type="text"
                            inputMode="numeric"
                          />
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2 transition-opacity duration-300"
                disabled={digits.includes("") || isPending}
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                {isPending
                  ? "Saving..."
                  : step === "create"
                  ? "Continue"
                  : "Save Passcode"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
