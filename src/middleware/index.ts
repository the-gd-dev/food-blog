import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const GUEST_ROUTES = ["/auth/signin", "/auth/signup"];

export function middleware(request: NextRequest) {
  const isAuth = Boolean(request.cookies.get("token")?.value != "");

  const pathname = request.nextUrl.pathname;

  const isGuestRoute = GUEST_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuth && isGuestRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
