import { z } from "zod";

export const registerUserSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 128 characters"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits")
    .min(9, "Phone number must be at least 9 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 20 characters"),
});

export const addToCartSchema = z.object({
  productId: z.number().int(),
  userId: z.number().int(),
  productQuantity: z.number().int().positive(),
});

export const cartItemIdSchema = z.object({
  cartItemId: z.number().int(),
});

export const checkoutSchema = z.object({
  cartItemIds: z.array(z.number().int()).optional(),
});

export const PRODUCTS_PER_PAGE = 20;
