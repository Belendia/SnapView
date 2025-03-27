"use server";

import * as z from "zod";

// import { update } from "@/auth";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserById } from "@/lib/data";
import { currentUser } from "@/lib/auth";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  let dbUser = null;

  if (user.id) {
    dbUser = await getUserById(user.id);
  }

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const validatedFields = SettingsSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, role } = validatedFields.data;

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      name,
      role,
    },
  });

  //   update({
  //     user: {
  //       name: updatedUser.name,
  //       email: updatedUser.email,
  //       role: updatedUser.role,
  //     },
  //   });

  return { success: "Settings Updated!" };
};
