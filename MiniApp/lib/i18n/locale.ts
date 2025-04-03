//use server is required
"use server";

import { cookies } from "next/headers";

import { defaultLocale } from "./config";
import type { Locale } from "./types";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

const getLocale = async () => {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value || defaultLocale;
};

const setLocale = async (locale?: string) => {
  const store = await cookies();
  store.set(COOKIE_NAME, (locale as Locale) || defaultLocale);
};

export { getLocale, setLocale };
