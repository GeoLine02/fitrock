import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Categories shown in the storefront filter / admin CRUD.
const CATEGORIES = ["Dumbbells", "Kettlebells", "Barbells", "Accessories"];

// Storefront catalogue. `weight` of 0 means the product has no weight filter.
const PRODUCTS = [
  { name: "Olympic 20kg Dumbbell",          price: 180, discount: 5,  quantity: 25,  weight: 20, category: "Dumbbells",   description: "Knurled chrome handle with fixed Olympic weight plates for a balanced, durable lift." },
  { name: "Rubber Hex Dumbbell 15kg",       price: 140, discount: 0,  quantity: 40,  weight: 15, category: "Dumbbells",   description: "Hexagonal rubber-coated head that won't roll and protects your floors." },
  { name: "Chrome Dumbbell 12kg",           price: 110, discount: 3,  quantity: 30,  weight: 12, category: "Dumbbells",   description: "Polished chrome dumbbell with an ergonomic grip, ideal for studio workouts." },
  { name: "Adjustable Dumbbell Set",        price: 320, discount: 10, quantity: 15,  weight: 20, category: "Dumbbells",   description: "Quick-change adjustable dumbbells replacing a full rack in one compact unit." },
  { name: "Studio Premium Kettlebell 16kg", price: 95,  discount: 15, quantity: 50,  weight: 16, category: "Kettlebells", description: "Single-cast kettlebell with a smooth wide handle for swings and presses." },
  { name: "Cast Iron Kettlebell 8kg",       price: 55,  discount: 0,  quantity: 60,  weight: 8,  category: "Kettlebells", description: "Classic cast-iron kettlebell, perfect for building foundational strength." },
  { name: "EZ Curl Bar",                    price: 130, discount: 0,  quantity: 20,  weight: 10, category: "Barbells",    description: "Cambered curl bar that reduces wrist strain during biceps and triceps work." },
  { name: "Olympic Barbell 20kg",           price: 260, discount: 2,  quantity: 18,  weight: 20, category: "Barbells",    description: "2.2m Olympic barbell with dual knurl marks and smooth rotating sleeves." },
  { name: "Weighted Vest 10kg",             price: 120, discount: 0,  quantity: 22,  weight: 10, category: "Accessories", description: "Adjustable weighted vest to add intensity to calisthenics and cardio." },
  { name: "Resistance Band Pack",           price: 35,  discount: 5,  quantity: 100, weight: 0,  category: "Accessories", description: "Five colour-coded latex bands covering light to heavy resistance levels." },
  { name: "Foam Roller Pro",                price: 45,  discount: 0,  quantity: 80,  weight: 0,  category: "Accessories", description: "High-density textured foam roller for recovery and myofascial release." },
  { name: "Medicine Ball 5kg",              price: 60,  discount: 0,  quantity: 35,  weight: 5,  category: "Accessories", description: "Durable textured medicine ball for slams, throws and core training." },
  { name: "Pull-Up Assist Band",            price: 25,  discount: 0,  quantity: 120, weight: 0,  category: "Accessories", description: "Looped resistance band that assists pull-ups and aids mobility drills." },
];

async function upsertCategory(name) {
  return prisma.category.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}

async function findOrCreateFilter(weight) {
  const existing = await prisma.filter.findFirst({
    where: { weight_amount: weight },
  });
  if (existing) return existing;
  return prisma.filter.create({ data: { weight_amount: weight } });
}

async function main() {
  console.log("Seeding categories...");
  const categoryByName = {};
  for (const name of CATEGORIES) {
    const cat = await upsertCategory(name);
    categoryByName[name] = cat.id;
  }

  console.log("Seeding weight filters...");
  const filterByWeight = {};
  const weights = [...new Set(PRODUCTS.map((p) => p.weight).filter((w) => w > 0))];
  for (const w of weights) {
    const filter = await findOrCreateFilter(w);
    filterByWeight[w] = filter.id;
  }

  console.log("Seeding products...");
  let created = 0;
  let skipped = 0;
  for (const p of PRODUCTS) {
    const existing = await prisma.product.findFirst({
      where: { product_name: p.name },
    });
    if (existing) {
      skipped++;
      continue;
    }
    await prisma.product.create({
      data: {
        product_name: p.name,
        product_price: p.price,
        product_description: p.description,
        product_discount: p.discount,
        product_quantity: p.quantity,
        product_weight: p.weight || null,
        filter_id: p.weight > 0 ? filterByWeight[p.weight] : null,
        category_id: categoryByName[p.category],
      },
    });
    created++;
  }

  console.log(
    `Done. Categories: ${CATEGORIES.length}, products created: ${created}, skipped (already present): ${skipped}.`,
  );
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
