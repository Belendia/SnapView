import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("----------------------------------");
  console.log("----------------------------------");
  console.log("----------------------------------");
  console.log("---------auth api-----------------");
  console.log("----------------------------------");
  console.log("----------------------------------");
  console.log("----------------------------------");
  console.log("----------------------------------");

  const { searchParams } = new URL(req.url);
  const telegramId = searchParams.get("telegramId");

  if (!telegramId) {
    return NextResponse.redirect(
      new URL("/error?reason=missing_telegram_id", req.url)
    );
  }

  // Find or create Telegram user
  let telegramUser = await db.telegramUser.findUnique({
    where: { telegramId },
  });

  if (!telegramUser) {
    telegramUser = await db.telegramUser.create({
      data: {
        telegramId,
        username: null,
        firstName: null,
        lastName: null,
      },
    });
  }

  // Check for any linked DHIS2 accounts
  const hasLinkedDhis2 = await db.user.findFirst({
    where: { telegramUserId: telegramUser.id },
  });

  if (!hasLinkedDhis2) {
    return NextResponse.redirect(
      new URL(`/connect-dhis2?telegramId=${telegramId}`, req.url)
    );
  }

  // User is valid and connected → redirect to dashboard
  return NextResponse.redirect(
    new URL(`/dashboard?telegramId=${telegramId}`, req.url)
  );
}
