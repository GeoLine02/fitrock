import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "./tokens";

export interface UserJwtPayload {
  id: number;
  email?: string;
}

export type AuthResult =
  | { ok: true; user: UserJwtPayload }
  | { ok: false; response: NextResponse };

export async function requireUser(): Promise<AuthResult> {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) {
    return {
      ok: false,
      response: NextResponse.json(
        { success: false, message: "Unauthorized: No access token provided" },
        { status: 401 },
      ),
    };
  }

  try {
    const decoded = verifyAccessToken<UserJwtPayload>(accessToken);
    return { ok: true, user: decoded };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      response: NextResponse.json(
        { success: false, message: "Unauthorized: Invalid token" },
        { status: 401 },
      ),
    };
  }
}

export async function optionalUser(): Promise<UserJwtPayload | null> {
  const accessToken = (await cookies()).get("accessToken")?.value;
  if (!accessToken) return null;

  try {
    return verifyAccessToken<UserJwtPayload>(accessToken);
  } catch {
    return null;
  }
}
