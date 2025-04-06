export async function validateDHIS2Credentials(
  url: string,
  username: string,
  password: string
): Promise<boolean> {
  try {
    const response = await fetch(`${url}/api/me`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
          "base64"
        )}`,
        Accept: "application/json",
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Failed to authenticate with DHIS2:", error);
    return false;
  }
}
