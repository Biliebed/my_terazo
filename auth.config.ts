import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Demo users (nanti bisa pindah ke database)
const DEMO_USERS = [
  {
    id: "1",
    email: "admin@myterazo.com",
    password: "admin123",
    name: "Admin My Terazo",
    role: "admin",
  },
  {
    id: "2",
    email: "user@myterazo.com",
    password: "user123",
    name: "User Demo",
    role: "user",
  },
];

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user by email and password
        const user = DEMO_USERS.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password
        );

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnLogin = nextUrl.pathname === "/admin/login";
      const userRole = auth?.user?.role;

      // Admin pages require admin role
      if (isOnAdmin && !isOnLogin) {
        if (!isLoggedIn) return false;
        if (userRole !== "admin") return false;
        return true;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
