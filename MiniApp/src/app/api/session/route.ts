export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getUserFromSession,
  updateUserSessionExpiration,
} from "@/lib/auth/session";
import { isInternalRequest } from "@/lib/utils";

// export async function GET(request: Request) {
//   if (!isInternalRequest(request)) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//   }

//   const cookieStore = await cookies();

//   try {
//     const user = await getUserFromSession(cookieStore as any);
//     if (!user) {
//       return NextResponse.json({ valid: false }, { status: 401 });
//     }

//     return NextResponse.json({ valid: true, user });
//   } catch (err) {
//     console.error("Session validation error:", err);
//     return NextResponse.json(
//       { error: "Session validation failed" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: Request) {
  if (!isInternalRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const cookieStore = await cookies();

  try {
    const user = await getUserFromSession(cookieStore as any);
    if (!user) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    await updateUserSessionExpiration(cookieStore as any);
    return NextResponse.json({ valid: true, user });
  } catch (err) {
    console.error("Session validation/update error:", err);
    return NextResponse.json(
      { error: "Failed to validate session" },
      { status: 500 }
    );
  }
}
