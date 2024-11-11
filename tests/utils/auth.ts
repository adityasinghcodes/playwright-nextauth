import { JWT } from "next-auth/jwt";
import dotenv from "dotenv";

dotenv.config();

export async function getSessionTokenForTest(payload: JWT) {
  if (!process.env.AUTH_SECRET) throw new Error("Auth secret not found.");

  const { encode } = await import("next-auth/jwt");
  const sessionToken = await encode({
    token: payload,
    secret: process.env.AUTH_SECRET,
    salt:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

  return sessionToken;
}
