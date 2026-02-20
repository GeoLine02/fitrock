import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import api from "./utils/axios";

export async function proxy(request: NextRequest) {
  const protectedRoutes = ["/cart"];

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const res = await api.post(
        "/auth/refresh-token",
        {},
        {
          headers: {
            Cookie: `refreshToken=${refreshToken}`,
          },
        },
      );
      return res.data.accessToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // Get tokens from request cookies
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;

  // Redirect authenticated users away from auth pages
  if (
    (pathname.startsWith("/signin") || pathname.startsWith("/signup")) &&
    (refreshToken || accessToken)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !refreshToken &&
    !accessToken
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Refresh token if needed
  if (refreshToken && !accessToken) {
    const newAccessToken = await refreshAccessToken(refreshToken);
    if (newAccessToken) {
      const response = NextResponse.next();

      // Set the cookie in the response
      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 15 * 60, // 15 minutes
      });

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|.*\\.png$).*)",
};
