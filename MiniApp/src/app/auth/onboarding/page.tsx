"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import DHIS2Page from "@/app/(protected)/settings/connect-dhis2/page";
import SetPasscodePage from "@/app/(protected)/settings/passcode/page";

export default function OnboardingStepper() {
  const [step, setStep] = useState<"passcode" | "dhis2">("passcode");
  const router = useRouter();

  const handleNext = () => {
    if (step === "passcode") {
      setStep("dhis2");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-white">
      <Card className="w-full max-w-2xl shadow-lg border">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold">
            {step === "passcode"
              ? "Step 1: Create a Passcode"
              : "Step 2: Connect to DHIS2"}
          </CardTitle>
          <CardDescription>
            {step === "passcode"
              ? "Secure your account with a 6-digit passcode."
              : "Link your DHIS2 account to start tracking data."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-md p-4">
            {step === "passcode" ? <SetPasscodePage /> : <DHIS2Page />}
          </div>

          <div className="flex justify-end">
            <Button onClick={handleNext}>
              {step === "dhis2" ? "Finish" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
