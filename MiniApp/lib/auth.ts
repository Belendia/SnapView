// A library to get the current user and role in the server side.
// It is similar to the user-current-user hook which is designed for client
// But it is runs in the server side.
import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
