import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import api from "./utils/axios";
import { cookies } from "next/headers";

export async function proxy(request: NextRequest) {
  const protectedRoutes = ["/cart"];

  const refreshAccessToken = async () => {
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
    }
  };

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const accessToken = cookieStore.get("accessToken")?.value;
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
    const newAccessToken = await refreshAccessToken();
    console.log("new Access token", newAccessToken);

    const response = NextResponse.next();
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|.*\\.png$).*)",
};
