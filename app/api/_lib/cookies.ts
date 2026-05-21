import { NextResponse } from "next/server";

const FIFTEEN_MINUTES = 15 * 60 * 1000;
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

interface AuthCookieOptions {
  accessToken?: string;
  refreshToken?: string;
}

export function setAuthCookies(
  res: NextResponse,
  { accessToken, refreshToken }: AuthCookieOptions,
) {
  const isProduction = process.env.NODE_ENV === "production";

  if (accessToken) {
    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
      maxAge: FIFTEEN_MINUTES / 1000,
    });
  }

  if (refreshToken) {
    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
      maxAge: SEVEN_DAYS / 1000,
    });
  }
}

export function clearAuthCookies(res: NextResponse) {
  const isProduction = process.env.NODE_ENV === "production";
  const baseOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: (isProduction ? "none" : "lax") as "none" | "lax",
    path: "/",
  };
  res.cookies.set("accessToken", "", { ...baseOptions, maxAge: 0 });
  res.cookies.set("refreshToken", "", { ...baseOptions, maxAge: 0 });
}
