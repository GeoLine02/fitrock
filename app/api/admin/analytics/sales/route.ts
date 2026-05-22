import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/app/api/admin/_lib/auth";
import { getMonthlySales } from "@/lib/analytics";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const monthsParam = Number(req.nextUrl.searchParams.get("months"));
  const months =
    Number.isFinite(monthsParam) && monthsParam > 0 && monthsParam <= 24
      ? monthsParam
      : 6;

  try {
    const sales = await getMonthlySales(months);
    return NextResponse.json({ sales }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
