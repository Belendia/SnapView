import * as jose from "jose";

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

export async function encryptPassword(password: string) {
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

export async function decryptPassword(encryptedPassword: string) {
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
