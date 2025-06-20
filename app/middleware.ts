import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPublicKey } from "./lib/crypto";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const pkCookie = request.cookies.get("pk");
  const loggedIn = pkCookie && getPublicKey(pkCookie.value);

  console.log(request.nextUrl.pathname);

  // If no cookie or invalid, send back to the homepage
  if (request.nextUrl.pathname !== "/" && (!loggedIn)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is trying to access something other than /wallet but is valid, send to /wallet
  if (request.nextUrl.pathname !== "/wallet" && loggedIn) {
    return NextResponse.redirect(new URL("/wallet", request.url));
  }

  // Otherwise, continue
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/wallet"],
};
