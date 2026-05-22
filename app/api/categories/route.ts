import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/app/api/_lib/rateLimit";

export async function GET(req: NextRequest) {
  const limited = rateLimit(req);
  if (limited) return limited;

  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
