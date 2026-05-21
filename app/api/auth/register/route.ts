import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken } from "@/app/api/_lib/tokens";
import { setAuthCookies } from "@/app/api/_lib/cookies";
import { validateBody } from "@/app/api/_lib/validate";
import { registerUserSchema } from "@/app/api/_lib/validations";
import { rateLimit } from "@/app/api/_lib/rateLimit";

export async function POST(req: NextRequest) {
  const limited = rateLimit(req);
  if (limited) return limited;

  try {
    const body = await req.json();
    const validation = validateBody(registerUserSchema, body);
    if (!validation.ok) return validation.response;

    const { fullName, email, phoneNumber, password } = validation.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        full_name: fullName,
        email,
        password: hashedPassword,
        phone_number: phoneNumber,
      },
    });

    const payload = { id: user.id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const response = NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            phone_number: user.phone_number,
          },
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
