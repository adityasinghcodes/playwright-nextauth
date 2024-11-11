import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import prisma from "./lib/prisma";

import bcryptjs from "bcryptjs";
import { NextAuthConfig } from "next-auth";

const authRoutes = ["/auth/signin", "/auth/signup"];
const adminRoutes = ["/admin"];

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        let user = null;

        // validate credentials
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }
        // get user

        user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          console.log("Invalid credentials");
          return null;
        }

        if (!user.password) {
          console.log(
            "User has no password. They probably signed up with an oauth provider.",
          );
          return null;
        }

        const isPasswordValid = await bcryptjs.compare(
          credentials.password as string,
          user.password,
        );
        if (!isPasswordValid) {
          console.log("Invalid password");
          return null;
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;
      const { pathname } = nextUrl;

      const isAuthRoute = authRoutes.some((route) =>
        pathname.startsWith(route),
      );
      const isAdminRoute = adminRoutes.some((route) =>
        pathname.startsWith(route),
      );

      if (isLoggedIn) {
        if (isAuthRoute) return Response.redirect(new URL("/", nextUrl));
        if (isAdminRoute && role !== "admin")
          return Response.redirect(new URL("/", nextUrl));
      }

      // here the user is not logged in
      if (isAuthRoute) return true;

      return isLoggedIn;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
} satisfies NextAuthConfig;
