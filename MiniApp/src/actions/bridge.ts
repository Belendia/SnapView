import { loginWithPasscode } from "./auth";

export async function validatePasscode(telegramId: string, passcode: string) {
  return await loginWithPasscode({ telegramId, passcode });
}
