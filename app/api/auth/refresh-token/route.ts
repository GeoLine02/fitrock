import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  verifyRefreshToken,
} from "@/app/api/_lib/tokens";
import { setAuthCookies } from "@/app/api/_lib/cookies";
import { rateLimit } from "@/app/api/_lib/rateLimit";

export async function POST(req: NextRequest) {
  const limited = rateLimit(req);
  if (limited) return limited;

  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token provided" },
        { status: 401 },
      );
    }

    const decoded = verifyRefreshToken<{ id: number }>(refreshToken);
    const newAccessToken = generateAccessToken({ id: decoded.id });

    const response = NextResponse.json(
      {
        success: true,
        message: "Token refreshed successfully",
        accessToken: newAccessToken,
      },
      { status: 200 },
    );
    setAuthCookies(response, { accessToken: newAccessToken });
    return response;
  } catch (error) {
    console.error("Refresh token error:", error);

    if (
      error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError
    ) {
      return NextResponse.json(
        { success: false, message: "Token expired" },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
