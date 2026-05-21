import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/app/api/_lib/cookies";

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 },
    );
    clearAuthCookies(response);
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
