"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { PasscodeSchema } from "@/schemas";

export async function savePasscode(value: z.infer<typeof PasscodeSchema>) {
  const parseResult = PasscodeSchema.safeParse(value);
  if (!parseResult.success) {
    return {
      error: "Validation failed",
      issues: parseResult.error.format(),
    };
  }

  const { telegramId, passcode } = parseResult.data;

  const telegramUser = await db.telegramUser.findUnique({
    where: { telegramId },
  });

  if (!telegramUser) {
    return { error: "Telegram user not found." };
  }

  await db.telegramUser.update({
    where: { telegramId },
    data: { passcode },
  });

  return { success: "Passcode updated!" };
}
