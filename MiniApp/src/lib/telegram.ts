"use client";

import { useSignal, initData, User } from "@telegram-apps/sdk-react";

export function useTelegramUser(): User | null {
  const initDataState = useSignal(initData.state);
  return initDataState?.user ?? null;
}
