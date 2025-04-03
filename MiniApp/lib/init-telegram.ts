import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  init as initSDK,
} from "@telegram-apps/sdk-react";

/**
 * Initializes the application and configures its dependencies.
 */
export function initTelegram(): void {
  if ((window as any).__TG_ENV_INITIALIZED__) return; // Global guard to avoid multiple runs
  (window as any).__TG_ENV_INITIALIZED__ = true;

  // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
  // Also, configure the package.
  initSDK();

  // Mount all components used in the project.
  backButton.isSupported() && backButton.mount();
  miniApp.mount();
  themeParams.mount();
  initData.restore();

  if (!viewport.isMounted() && !viewport.isMounting()) {
    void viewport
      .mount()
      .then(() => {
        // Define components-related CSS variables.
        viewport.bindCssVars();
        miniApp.bindCssVars();
        themeParams.bindCssVars();
      })
      .catch((e) => {
        console.error("Something went wrong mounting the viewport", e);
      });
  }
}
