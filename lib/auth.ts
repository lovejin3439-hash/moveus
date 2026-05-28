import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Demo accounts — work without a database
const DEMO_USERS = [
  {
    id: "demo-customer-1",
    name: "Demo Customer",
    email: "customer@demo.com",
    password: "demo1234",
    role: "CUSTOMER",
    vendorId: null,
  },
  {
    id: "demo-vendor-1",
    name: "GlobalMove Korea",
    email: "vendor@demo.com",
    password: "demo1234",
    role: "VENDOR",
    vendorId: "v1",
  },
  {
    id: "demo-corporate-1",
    name: "이지원 (Samsung HR)",
    email: "corporate@demo.com",
    password: "demo1234",
    role: "CORPORATE",
    vendorId: null,
  },
];

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // 1) Check demo accounts first (always works, no DB needed)
        const demoUser = DEMO_USERS.find(
          (u) =>
            u.email.toLowerCase() === credentials.email.toLowerCase() &&
            u.password === credentials.password
        );
        if (demoUser) {
          return {
            id: demoUser.id,
            name: demoUser.name,
            email: demoUser.email,
            role: demoUser.role,
            vendorId: demoUser.vendorId,
          };
        }

        // 2) Try DB if available
        try {
          const { prisma } = await import("./prisma");
          const bcrypt = (await import("bcryptjs")).default;

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: { vendor: true },
          });

          if (!user) return null;

          const valid = await bcrypt.compare(credentials.password, user.password);
          if (!valid) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            vendorId: user.vendor?.id ?? null,
          };
        } catch {
          // DB not available — only demo accounts work
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.vendorId = (user as any).vendorId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
        (session.user as any).vendorId = token.vendorId;
      }
      return session;
    },
  },
};
