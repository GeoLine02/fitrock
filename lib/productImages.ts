import { getStore } from "@netlify/blobs";

export const PRODUCT_IMAGES_STORE = "product-images";

export function getProductImagesStore() {
  return getStore({ name: PRODUCT_IMAGES_STORE, consistency: "strong" });
}

export function blobKeyFor(productId: number, fileName: string) {
  const ext = extFromName(fileName);
  const uuid = crypto.randomUUID();
  return `products/${productId}/${uuid}${ext}`;
}

export function publicUrlForBlobKey(blobKey: string) {
  return `/api/products/images/${blobKey}`;
}

function extFromName(name: string) {
  const dot = name.lastIndexOf(".");
  if (dot < 0 || dot === name.length - 1) return "";
  return name.slice(dot).toLowerCase();
}

export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
