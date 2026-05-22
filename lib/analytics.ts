import { Prisma, OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const SALES_STATUS_FILTER: OrderStatus = "PAID";

export interface MonthlySalesPoint {
  month: string;
  total: number;
}

export async function getMonthlySales(months = 6): Promise<MonthlySalesPoint[]> {
  const now = new Date();
  const start = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (months - 1), 1),
  );

  const orders = await prisma.order.findMany({
    where: {
      status: SALES_STATUS_FILTER,
      createdAt: { gte: start },
    },
    select: { total: true, createdAt: true },
  });

  const buckets = new Map<string, number>();
  for (let i = 0; i < months; i += 1) {
    const d = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (months - 1 - i), 1),
    );
    buckets.set(monthKey(d), 0);
  }

  for (const o of orders) {
    const key = monthKey(o.createdAt);
    buckets.set(key, (buckets.get(key) ?? 0) + o.total);
  }

  return Array.from(buckets.entries()).map(([month, total]) => ({
    month,
    total,
  }));
}

function monthKey(d: Date): string {
  const fmt = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "2-digit",
    timeZone: "UTC",
  });
  return fmt.format(d);
}

export interface OrderStatusCount {
  status: OrderStatus;
  count: number;
}

export async function getOrderStatusCounts(): Promise<OrderStatusCount[]> {
  const grouped = await prisma.order.groupBy({
    by: ["status"],
    _count: { _all: true },
  });

  const map = new Map<OrderStatus, number>();
  for (const g of grouped) {
    map.set(g.status, g._count._all);
  }

  const statuses: OrderStatus[] = ["PAID", "PENDING", "CANCELLED", "REFUNDED"];
  return statuses.map((status) => ({
    status,
    count: map.get(status) ?? 0,
  }));
}

export interface RecentOrderRow {
  id: number;
  userName: string;
  total: number;
  status: OrderStatus;
  createdAt: Date;
}

export async function getRecentOrders(limit = 10): Promise<RecentOrderRow[]> {
  const orders = await prisma.order.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { full_name: true } } },
  });

  return orders.map((o) => ({
    id: o.id,
    userName: o.user.full_name,
    total: o.total,
    status: o.status,
    createdAt: o.createdAt,
  }));
}

export interface PopularProductRow {
  productId: number;
  productName: string;
  totalQuantity: number;
}

export async function getPopularProducts(limit = 6): Promise<PopularProductRow[]> {
  const grouped = await prisma.orderItem.groupBy({
    by: ["product_id"],
    _sum: { product_quantity: true },
    orderBy: { _sum: { product_quantity: Prisma.SortOrder.desc } },
    take: limit,
  });

  if (grouped.length === 0) return [];

  const products = await prisma.product.findMany({
    where: { id: { in: grouped.map((g) => g.product_id) } },
    select: { id: true, product_name: true },
  });
  const nameById = new Map(products.map((p) => [p.id, p.product_name]));

  return grouped.map((g) => ({
    productId: g.product_id,
    productName: nameById.get(g.product_id) ?? `#${g.product_id}`,
    totalQuantity: g._sum.product_quantity ?? 0,
  }));
}
