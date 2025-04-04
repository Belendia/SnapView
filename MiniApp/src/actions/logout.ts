"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // Do any other cleanup or logging
  await signOut();
};
