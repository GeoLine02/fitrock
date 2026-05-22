import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const protectedRoutes = ["/cart"];

  const accessToken = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;

  // ---- Admin routes ----
  const isAdminAuthRoute =
    pathname.startsWith("/admin/signin") ||
    pathname.startsWith("/admin/signup");

  if (pathname.startsWith("/admin")) {
    if (!accessToken && !isAdminAuthRoute) {
      return NextResponse.redirect(new URL("/admin/signin", request.url));
    }
    if (accessToken && isAdminAuthRoute) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // Redirect authenticated users away from auth pages
  if (
    (pathname.startsWith("/signin") || pathname.startsWith("/signup")) &&
    accessToken
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !accessToken
  ) {
    const signInUrl = new URL("/sign-in", request.url);
    const returnTo = pathname + (request.nextUrl.search ?? "");
    signInUrl.searchParams.set("redirectTo", returnTo);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|.*\\.png$).*)",
};
