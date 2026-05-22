import jwt, { SignOptions } from "jsonwebtoken";

export function generateAccessToken(payload: object): string {
  const options: SignOptions = { expiresIn: "7d" };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, options);
}

export function verifyAccessToken<T = unknown>(token: string): T {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as T;
}
