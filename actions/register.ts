"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByUsername } from "@/lib/data";
import { encryptPassword } from "@/lib/crypto";
// import { getUserByEmail } from "@/data/user";
// import { sendVerificationEmail } from "@/lib/mail";
// import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { username, password, name } = validatedFields.data;
  const hashedPassword = await encryptPassword(password);

  const existingUser = await getUserByUsername(username);

  if (existingUser) {
    return { error: "Username already in use!" };
  }

  await db.user.create({
    data: {
      name,
      username,
      password: hashedPassword,
    },
  });

  // const verificationToken = await generateVerificationToken(email);
  // await sendVerificationEmail(
  //   verificationToken.email,
  //   verificationToken.token,
  // );

  return { success: "User created!" };
};
