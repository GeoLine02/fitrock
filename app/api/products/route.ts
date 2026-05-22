import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PRODUCTS_PER_PAGE } from "@/app/api/_lib/validations";
import { rateLimit } from "@/app/api/_lib/rateLimit";
import { optionalUser } from "@/app/api/_lib/auth";

type ProductSort =
  | "price_asc"
  | "price_desc"
  | "name_asc"
  | "name_desc"
  | "discount_desc"
  | "newest";

const ORDER_BY: Record<ProductSort, Prisma.ProductOrderByWithRelationInput> = {
  price_asc: { product_price: "asc" },
  price_desc: { product_price: "desc" },
  name_asc: { product_name: "asc" },
  name_desc: { product_name: "desc" },
  discount_desc: { product_discount: "desc" },
  newest: { createdAt: "desc" },
};

const SORT_VALUES = Object.keys(ORDER_BY) as ProductSort[];

function parseBool(v: string | null): boolean | undefined {
  if (v === null) return undefined;
  if (v === "true" || v === "1") return true;
  if (v === "false" || v === "0") return false;
  return undefined;
}

export async function GET(req: NextRequest) {
  const limited = rateLimit(req);
  if (limited) return limited;

  try {
    const params = req.nextUrl.searchParams;
    const page = Number(params.get("page")) || 1;
    const offset = PRODUCTS_PER_PAGE * (page - 1);

    const weightFilterId = params.get("weightFilterId")
      ? Number(params.get("weightFilterId"))
      : undefined;
    const minPrice = params.get("minPrice")
      ? Number(params.get("minPrice"))
      : undefined;
    const maxPrice = params.get("maxPrice")
      ? Number(params.get("maxPrice"))
      : undefined;
    const search = params.get("search") ?? undefined;
    const rawSort = params.get("sort");
    const sort: ProductSort | undefined =
      rawSort && (SORT_VALUES as string[]).includes(rawSort)
        ? (rawSort as ProductSort)
        : undefined;
    const onSale = parseBool(params.get("onSale"));
    const inStock = parseBool(params.get("inStock"));

    const where: Prisma.ProductWhereInput = {};
    if (weightFilterId) where.filter_id = weightFilterId;
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.product_price = {};
      if (minPrice !== undefined) where.product_price.gte = minPrice;
      if (maxPrice !== undefined) where.product_price.lte = maxPrice;
    }
    if (search && search.trim().length > 0) {
      where.product_name = { contains: search.trim(), mode: "insensitive" };
    }
    if (onSale) where.product_discount = { gt: 0 };
    if (inStock) where.product_quantity = { gt: 0 };

    const orderBy = sort ? ORDER_BY[sort] : { id: "asc" as const };

    const user = await optionalUser();

    const [products, total, cart] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: offset,
        take: PRODUCTS_PER_PAGE,
        orderBy,
      }),
      prisma.product.count({ where }),
      user
        ? prisma.cart.findMany({
            where: { user_id: user.id },
            include: { product: true },
          })
        : Promise.resolve([]),
    ]);

    const nextPage =
      offset + PRODUCTS_PER_PAGE < total ? page + 1 : null;

    return NextResponse.json(
      { products, currentPage: page, nextPage, total, cart },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
