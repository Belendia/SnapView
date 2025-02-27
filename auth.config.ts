import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas";
import { getUserByUsername } from "@/lib/data";
import { decryptPassword } from "@/lib/crypto";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { username, password } = validatedFields.data;

          const user = await getUserByUsername(username);
          if (!user || !user.password) return null;

          const decryptedPassword = await decryptPassword(user.password);

          if (decryptedPassword && password === decryptedPassword) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
