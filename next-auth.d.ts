import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  username: string;
  role: UserRole;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     username: string;
//     role: UserRole;
//     isOAuth: boolean;
//   }
// }
