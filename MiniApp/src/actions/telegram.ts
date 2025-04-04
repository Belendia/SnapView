"use server";

import { db } from "@/lib/db";
import { TelegramUserSchema } from "@/schemas";

import { z } from "zod";

export async function checkTelegramUserAndStatus(
  input: z.infer<typeof TelegramUserSchema>
) {
  const parseResult = TelegramUserSchema.safeParse(input);

  if (!parseResult.success) {
    return {
      error: "Validation failed",
      issues: parseResult.error.format(),
    };
  }

  const { telegramId, username, firstName, lastName } = parseResult.data;

  let telegramUser = await db.telegramUser.findUnique({
    where: { telegramId },
    include: { users: true }, // Linked DHIS2 accounts
  });

  if (!telegramUser) {
    telegramUser = await db.telegramUser.create({
      data: {
        telegramId,
        username,
        firstName,
        lastName,
      },
      include: { users: true },
    });
  }

  const hasLinkedToDHIS2 = telegramUser.users.length > 0;

  return { hasLinkedToDHIS2 };
}
