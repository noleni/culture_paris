import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // Votre instance Prisma
import { generateUniqueSlug } from "@/lib/users";
import { NextAuthOptions } from "next-auth";
import { DefaultSession } from "next-auth";
import { User as AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      slug: string | null; // Ajoutez 'slug' ici
    } & DefaultSession["user"];
  }

  interface User extends AdapterUser {
    slug: string | null; // Ajoutez 'slug' ici également
  }
}


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    async createUser(message) {
      const { email, name } = message.user;
      if (email && name) {
        await prisma.user.update({
          where: { email },
          data: {
            slug: await generateUniqueSlug(name),
          },
        });
      }
    },
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.slug = user.slug || null;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
