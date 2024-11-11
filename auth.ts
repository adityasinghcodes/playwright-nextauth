import NextAuth from "next-auth";
import prisma from "./lib/prisma";

import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    ...authConfig
})