import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/app/api/_lib/tokens";
import { setAuthCookies } from "@/app/api/_lib/cookies";
import { validateBody } from "@/app/api/_lib/validate";
import { rateLimit } from "@/app/api/_lib/rateLimit";
import { adminSignupSchema } from "@/app/api/admin/_lib/validations";

export async function POST(req: NextRequest) {
  const limited = rateLimit(req);
  if (limited) return limited;

  try {
    const body = await req.json();
    const validation = validateBody(adminSignupSchema, body);
    if (!validation.ok) return validation.response;

    const { fullName, email, password } = validation.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.create({
      data: {
        full_name: fullName,
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    const payload = { id: admin.id, email: admin.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: admin.id,
          full_name: admin.full_name,
          email: admin.email,
          phone_number: admin.phone_number,
        },
      },
      { status: 201 },
    );
    setAuthCookies(response, { accessToken, refreshToken });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
