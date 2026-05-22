-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- AlterTable
ALTER TABLE "Products" ADD COLUMN "category_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
