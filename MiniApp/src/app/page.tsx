"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useTelegramUser } from "@/lib/telegram";
import { checkTelegramUserAndStatus } from "@/actions/telegram";

import { Loader } from "@/components/loader";

export default function Home() {
  const router = useRouter();
  const tgUser = useTelegramUser();

  useEffect(() => {
    const init = async () => {
      if (!tgUser) {
        console.error("No Telegram user found.");
        return;
      }

      const result = await checkTelegramUserAndStatus({
        telegramId: tgUser.id.toString(),
        username: tgUser.username,
        firstName: tgUser.firstName,
        lastName: tgUser.lastName,
      });

      if ("error" in result) {
        console.error(result.error);
        return;
      }

      if (result.hasLinkedToDHIS2) {
        router.push("/dashboard");
      } else {
        router.push("/connect-dhis2");
      }
    };

    init();
  }, [tgUser, router]);

  return <Loader />;
}
