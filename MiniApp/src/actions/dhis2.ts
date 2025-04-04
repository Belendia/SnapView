"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { DHIS2UserSchema } from "@/schemas";

import { encryptPassword } from "@/lib/crypto";

export async function createDHIS2Account(
  values: z.infer<typeof DHIS2UserSchema>
): Promise<{
  success?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}> {
  const validatedFields = DHIS2UserSchema.safeParse(values);

  if (!validatedFields.success) {
    const formatted = validatedFields.error.format();
    return {
      error: "Validation failed",
      fieldErrors: {
        telegramId: formatted.telegramId?._errors || [],
        username: formatted.username?._errors || [],
        password: formatted.password?._errors || [],
        systemId: formatted.systemId?._errors || [],
      },
    };
  }

  const { telegramId, systemId, username, password } = validatedFields.data;

  const telegramUser = await db.telegramUser.findUnique({
    where: { telegramId },
  });

  if (!telegramUser) {
    return { error: "Telegram user not found." };
  }

  const existingUser = await db.user.findFirst({
    where: {
      telegramUserId: telegramUser.id,
      systemId,
    },
  });

  if (existingUser) {
    return {
      error: "Only one user account can be registered per DHIS2 system..",
    };
  }

  const hashedPassword = await encryptPassword(password);

  await db.user.create({
    data: {
      username,
      password: hashedPassword,
      telegramUserId: telegramUser.id,
      systemId,
      role: "USER",
    },
  });

  return { success: "User created!" };
}

export async function getLinkedDHIS2Accounts(telegramId: string) {
  if (!telegramId) return [];

  const users = await db.user.findMany({
    where: {
      telegramUser: {
        telegramId,
      },
    },
    select: {
      id: true,
      username: true,
      system: {
        select: { name: true },
      },
    },
  });

  return users.map((u) => ({
    id: u.id,
    username: u.username,
    systemName: u.system.name,
  }));
}

export async function getAvailableDHIS2Systems() {
  const systems = await db.system.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return systems;
}
