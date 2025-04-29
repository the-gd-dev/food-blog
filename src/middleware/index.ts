import { httpClient } from "@/utils";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const GUEST_ROUTES = ["/auth/signin", "/auth/signup"];

export async function middleware(request: NextRequest) {
  const authToken = request?.cookies?.get("token")?.value ?? "";
  const pathname = request.nextUrl.pathname;
  const isGuestRoute = GUEST_ROUTES.some((route) => pathname.startsWith(route));

  if (!!authToken && isGuestRoute) {
    const raw = await httpClient({
      apiUrl: "/verify",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      isPrivate: true,
    });
    if (raw.ok) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
