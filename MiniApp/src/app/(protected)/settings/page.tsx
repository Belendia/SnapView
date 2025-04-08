// app/settings/page.tsx or wherever it's being used
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const SettingItem = ({
  title,
  description,
  href,
}: {
  title: string;
  description?: string;
  href?: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <div
      className="flex items-center justify-between py-4 cursor-pointer hover:bg-muted px-4 rounded-lg"
      onClick={handleClick}
    >
      <div>
        <h3 className="text-base font-medium leading-none">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </div>
  );
};

export default function SettingsPage() {
  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Settings</h1>

      <Card>
        <CardContent className="p-0">
          <SettingItem
            title="Link Accounts"
            description="Manage your linked DHIS2 accounts"
            href="/settings/linked-accounts"
          />
          <Separator />
          <SettingItem
            title="Set Passcode"
            description="Enable and manage your app passcode"
            href="/settings/passcode"
          />
        </CardContent>
      </Card>
    </div>
  );
}
