import { z } from "zod";

export const adminSigninSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const adminSignupSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters"),
});

export const productCreateSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional().nullable(),
  weightFilterId: z.coerce.number().int().nullable().optional(),
  categoryId: z.coerce.number().int().nullable().optional(),
  weight: z.coerce.number().int().nonnegative().optional().nullable(),
  price: z.coerce.number().int().nonnegative("Price is required"),
  discount: z.coerce.number().int().min(0).optional().nullable(),
  quantity: z.coerce.number().int().nonnegative().optional().nullable(),
});

export const productUpdateSchema = productCreateSchema.partial();

export const filterCreateSchema = z.object({
  weightAmount: z.coerce.number().int().positive("Weight must be positive"),
});

export const filterUpdateSchema = filterCreateSchema.partial();

export const categoryCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Category name is required")
    .max(80, "Category name cannot exceed 80 characters"),
});

export const categoryUpdateSchema = categoryCreateSchema.partial();

export const ADMIN_PAGE_SIZE = 10;
export const LOW_STOCK_THRESHOLD = 5;
