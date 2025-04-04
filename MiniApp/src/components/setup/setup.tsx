"use client";

import { type PropsWithChildren, useEffect } from "react";
import {
  initData,
  miniApp,
  useSignal,
  useLaunchParams,
} from "@telegram-apps/sdk-react";

import { AppRoot } from "@telegram-apps/telegram-ui";

import { ErrorBoundary } from "@/components/error-boundary";
import { ErrorPage } from "@/components/error-page";

import { useDidMount } from "@/hooks/use-did-mount";
import { useClientOnce } from "@/hooks/use-client-once";
import { setLocale } from "@/lib/i18n/locale";
import { initTelegram } from "@/lib/init-telegram";
import { useTelegramMock } from "@/hooks/use-telegram-mock";

function SetupInner({ children }: PropsWithChildren) {
  // Mock Telegram environment in development mode if needed.
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

  // Initialize the library.
  const lp = useLaunchParams();
  useClientOnce(() => {
    initTelegram();
  });

  const isDark = useSignal(miniApp.isDark);
  const initDataUser = useSignal(initData.user);

  // Set the user locale.
  useEffect(() => {
    initDataUser && setLocale(initDataUser.languageCode);
  }, [initDataUser]);

  return (
    <AppRoot
      appearance={isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      {children}
    </AppRoot>
  );
}

export function Setup(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of
  // the Server Side Rendering. That's why we are showing loader on the server
  // side.
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <SetupInner {...props} />
    </ErrorBoundary>
  ) : (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      Loading
    </div>
  );
}
