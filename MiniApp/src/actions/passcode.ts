"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { PasscodeSchema } from "@/schemas";
import { hashPasscode, comparePasscode, generateSalt } from "@/lib/crypto";
import { createUserSession } from "@/lib/auth/session";
import { cookies } from "next/headers";

export async function savePasscode(value: z.infer<typeof PasscodeSchema>) {
  const parseResult = PasscodeSchema.safeParse(value);
  if (!parseResult.success) {
    return {
      error: "Validation failed",
      issues: parseResult.error.format(),
    };
  }

  const { telegramId, passcode } = parseResult.data;

  try {
    const telegramUser = await db.telegramUser.findUnique({
      where: { telegramId },
    });

    if (!telegramUser) {
      return { error: "Telegram user not found." };
    }

    const salt = generateSalt();
    const hashedPasscode = await hashPasscode(passcode, salt);

    await db.telegramUser.update({
      where: { telegramId },
      data: { passcode: hashedPasscode, salt },
    });
  } catch {
    return { error: "Failed to save passcode." };
  }

  return { success: "Passcode updated!" };
}

export async function loginWithPasscode(input: z.infer<typeof PasscodeSchema>) {
  const parsed = PasscodeSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Invalid input." };
  }

  const { telegramId, passcode } = parsed.data;

  const user = await db.telegramUser.findUnique({
    where: { telegramId },
  });

  if (!user || !user.passcode || !user.salt) {
    return { success: false, error: "Incorrect passcode." };
  }

  const isValid = await comparePasscode({
    passcode,
    salt: user.salt,
    hashedPasscode: user.passcode,
  });

  if (!isValid) {
    return { success: false, error: "Incorrect passcode." };
  }

  await createUserSession(
    { id: user.telegramId, role: user.role },
    await cookies()
  );

  return { success: true };
}
