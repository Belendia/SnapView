import * as jose from "jose";
import crypto from "crypto";

async function stringToCryptoKey(secret: string): Promise<CryptoKey> {
  const keyBuffer = Buffer.from(secret, "base64"); // Decode base64
  return await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function encryptSystemPassword(password: string) {
  try {
    const encryptionKey = await stringToCryptoKey(
      process.env.PASSWORD_ENCRYPTION_KEY as string
    );
    const jwe = await new jose.EncryptJWT({ password })
      .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
      .encrypt(encryptionKey);
    return jwe;
  } catch (error) {
    console.error("Password encryption error:", error);
    return null;
  }
}

export async function decryptSystemPassword(encryptedPassword: string) {
  try {
    const encryptionKey = await stringToCryptoKey(
      process.env.PASSWORD_ENCRYPTION_KEY as string
    );

    const { payload } = await jose.jwtDecrypt(encryptedPassword, encryptionKey);
    return payload.password;
  } catch (error) {
    console.error("Password decryption error:", error);
    return null;
  }
}

export function hashPasscode(passcode: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(passcode.normalize(), salt, 64, (error, hash) => {
      if (error) reject(error);

      resolve(hash.toString("hex").normalize());
    });
  });
}

export async function comparePasscode({
  passcode,
  salt,
  hashedPasscode,
}: {
  passcode: string;
  salt: string;
  hashedPasscode: string;
}) {
  const inputHashedPassword = await hashPasscode(passcode, salt);

  return crypto.timingSafeEqual(
    Buffer.from(inputHashedPassword, "hex"),
    Buffer.from(hashedPasscode, "hex")
  );
}

export function generateSalt() {
  return crypto.randomBytes(16).toString("hex").normalize();
}
