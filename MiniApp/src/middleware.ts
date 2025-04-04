// import NextAuth from "next-auth";

// import authConfig from "@/auth.config";

// import {
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   authRoutes,
//   publicRoutes,
// } from "@/routes";

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   if (isApiAuthRoute) {
//     return;
//   }

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return;
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }

//     const encodedCallbackUrl = encodeURIComponent(callbackUrl);

//     return Response.redirect(
//       new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
//     );
//   }

//   return;
// });

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export default async function middleware(req: NextRequest) {
  // const { pathname } = req.nextUrl;
  // const telegramId = req.nextUrl.searchParams.get("telegramId");

  // // Step 1: Must have telegramId
  // if (!telegramId) {
  //   return NextResponse.redirect(new URL("/auth/start", req.url));
  // }

  // // Step 2: Find Telegram user
  // const telegramUser = await db.telegramUser.findUnique({
  //   where: { telegramId },
  //   include: { users: true },
  // });

  // if (!telegramUser) {
  //   // Back to auth/start if not yet created
  //   return NextResponse.redirect(
  //     new URL(`/auth/start?telegramId=${telegramId}`, req.url)
  //   );
  // }

  // const hasDhis2 = telegramUser.users.length > 0;

  // // Step 3: Only redirect if path mismatch
  // if (!hasDhis2 && pathname !== "/connect-dhis2") {
  //   return NextResponse.redirect(
  //     new URL(`/connect-dhis2?telegramId=${telegramId}`, req.url)
  //   );
  // }

  // if (hasDhis2 && pathname !== "/dashboard") {
  //   return NextResponse.redirect(
  //     new URL(`/dashboard?telegramId=${telegramId}`, req.url)
  //   );
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/connect-dhis2"],
};

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
