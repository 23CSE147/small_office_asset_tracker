// lib/authOptions.js
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = "admin@example.com";
        const adminPassword = "admin123";

        if (
          credentials.email === adminEmail &&
          credentials.password === adminPassword
        ) {
          return { id: "admin", name: "Admin", role: "admin", email: adminEmail };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
