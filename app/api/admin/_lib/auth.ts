import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/app/api/_lib/tokens";

export interface AdminJwtPayload {
  id: number;
  email?: string;
}

export type AdminAuthResult =
  | { ok: true; admin: { id: number; full_name: string; email: string; phone_number: string | null } }
  | { ok: false; response: NextResponse };

export async function requireAdmin(): Promise<AdminAuthResult> {
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

  let decoded: AdminJwtPayload;
  try {
    decoded = verifyAccessToken<AdminJwtPayload>(accessToken);
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

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      full_name: true,
      email: true,
      phone_number: true,
      role: true,
    },
  });

  if (!user || user.role !== "ADMIN") {
    return {
      ok: false,
      response: NextResponse.json(
        { success: false, message: "Forbidden: admin access required" },
        { status: 403 },
      ),
    };
  }

  return {
    ok: true,
    admin: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
    },
  };
}
