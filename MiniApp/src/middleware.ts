import { NextResponse, type NextRequest } from "next/server";

const privateRoutes = ["/dashboard"];
const adminRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const cookieHeader = request.headers.get("cookie");

  // Check if route needs protection
  const isProtectedRoute =
    privateRoutes.includes(url.pathname) || adminRoutes.includes(url.pathname);

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  if (!cookieHeader) {
    return NextResponse.redirect(new URL("/auth/login", url));
  }

  // Deep session check
  const sessionRes = await fetch(`${url.origin}/api/session`, {
    method: "POST",
    headers: {
      cookie: cookieHeader,
      "x-internal-secret": process.env.INTERNAL_API_SECRET!, // the api should only be accessed internally
    },
    cache: "no-store",
  });

  if (!sessionRes.ok) {
    return NextResponse.redirect(new URL("/auth/login", url));
  }

  const { user } = await sessionRes.json();

  // Role-based check for admin routes
  if (adminRoutes.includes(url.pathname) && user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
