import { getUserFromSession } from "@/lib/auth/session";
import { cookies } from "next/headers";
import { cache } from "react";
import { db } from "../db";

export const getCurrentUser = cache(
  async (withFullUser = false, redirectIfNotFound = false) => {
    const user = await getUserFromSession(await cookies());

    if (user == null) {
      return null;
    }

    if (withFullUser) {
      const fullUser = await getUserFromDb(user.id);
      // This should never happen
      if (fullUser == null) throw new Error("User not found in database");
      return fullUser;
    }
  }
);

function getUserFromDb(telegramId: string) {
  return db.telegramUser.findFirst({
    select: {
      id: true,
      telegramId: true,
      role: true,
      firstName: true,
      lastName: true,
      username: true,
    },
    where: { telegramId },
  });
}
