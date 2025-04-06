"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { CreateDHIS2UserSchema, UpdateDHIS2UserSchema } from "@/schemas";

import { encryptPassword } from "@/lib/crypto";
import { validateDHIS2Credentials } from "@/lib/dhis2";

export async function createDHIS2Account(
  values: z.infer<typeof CreateDHIS2UserSchema>
): Promise<{
  success?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}> {
  const validatedFields = CreateDHIS2UserSchema.safeParse(values);

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

  // Fetch system to get URL
  const system = await db.system.findUnique({
    where: { id: systemId },
  });
  if (!system) {
    return { error: "DHIS2 system not found." };
  }

  // Validate credentials with DHIS2
  const isValid = await validateDHIS2Credentials(
    system.serverUrl,
    username,
    password
  );
  if (!isValid) {
    return {
      error:
        "Login to the DHIS2 system was not successful. Please double-check your username and password.",
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

  return { success: "Account connected!" };
}

export async function updateDHIS2Account(
  values: z.infer<typeof UpdateDHIS2UserSchema>
): Promise<{
  success?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}> {
  const validated = UpdateDHIS2UserSchema.safeParse(values);

  if (!validated.success) {
    const formatted = validated.error.format();
    return {
      error: "Validation failed",
      fieldErrors: {
        id: formatted.id?._errors || [],
        telegramId: formatted.telegramId?._errors || [],
        username: formatted.username?._errors || [],
        password: formatted.password?._errors || [],
        systemId: formatted.systemId?._errors || [],
      },
    };
  }

  const { id, telegramId, username, password, systemId } = validated.data;

  const telegramUser = await db.telegramUser.findUnique({
    where: { telegramId },
  });

  if (!telegramUser) {
    return { error: "Telegram user not found." };
  }

  // Ensure the user to be updated belongs to this telegram user
  const existingUser = await db.user.findFirst({
    where: {
      id,
      telegramUserId: telegramUser.id,
    },
  });

  if (!existingUser) {
    return {
      error: "User not found or does not belong to this Telegram account.",
    };
  }

  // Fetch system to get URL
  const system = await db.system.findUnique({
    where: { id: systemId },
  });
  if (!system) {
    return { error: "DHIS2 system not found." };
  }

  // Validate credentials with DHIS2
  const isValid = await validateDHIS2Credentials(
    system.serverUrl,
    username,
    password
  );
  if (!isValid) {
    return {
      error:
        "Login to the DHIS2 system was not successful. Please double-check your username and password.",
    };
  }

  const hashedPassword = await encryptPassword(password);

  await db.user.update({
    where: { id },
    data: {
      username,
      password: hashedPassword,
      systemId,
    },
  });

  return { success: "Account updated!" };
}

export async function getLinkedDHIS2Accounts(telegramId: string) {
  const telegramUser = await db.telegramUser.findUnique({
    where: { telegramId },
    include: {
      users: {
        select: {
          id: true,
          username: true,
          system: {
            select: {
              name: true,
            },
          },
          telegramUser: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  return (
    telegramUser?.users.map((user) => ({
      id: user.id,
      username: user.username,
      name: `${user.telegramUser?.firstName ?? ""} ${
        user.telegramUser?.lastName ?? ""
      }`.trim(),
      systemName: user.system?.name ?? "Unknown",
    })) || []
  );
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

export async function getDHIS2AccountById(id: string) {
  const account = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      systemId: true,
    },
  });

  return account;
}

export async function deleteDHIS2Account({
  id,
  telegramId,
}: {
  id: string;
  telegramId: string;
}): Promise<{
  success?: string;
  error?: string;
}> {
  try {
    const telegramUser = await db.telegramUser.findUnique({
      where: { telegramId },
      include: { users: true },
    });

    if (!telegramUser) {
      return { error: "Unauthorized request." };
    }

    const userToDelete = telegramUser.users.find((user) => user.id === id);

    if (!userToDelete) {
      return { error: "You do not have permission to delete this account." };
    }

    await db.user.delete({
      where: { id },
    });

    return { success: "Account deleted successfully." };
  } catch (error) {
    console.error("Failed to delete DHIS2 account", error);
    return { error: "Failed to delete account." };
  }
}
