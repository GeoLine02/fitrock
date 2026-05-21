import { NextResponse } from "next/server";
import { ZodType } from "zod";

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; response: NextResponse };

export function validateBody<T>(
  schema: ZodType<T>,
  body: unknown,
): ValidationResult<T> {
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          success: false,
          errors: parsed.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      ),
    };
  }
  return { ok: true, data: parsed.data };
}
