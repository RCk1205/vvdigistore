import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../../lib/mongodb";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          return null;
        }

        const client = await clientPromise;

        const user = await client
          .db("luxurystore")
          .collection("users")
          .findOne({
            email: credentials.email,
          });

        if (!user) {
          return null;
        }

     console.log(
  "LOGIN EMAIL:",
  credentials.email
);

console.log(
  "ENTERED PASSWORD:",
  credentials.password
);

console.log(
  "DB HASH:",
  user.password
);

const validPassword =
  await bcrypt.compare(
    credentials.password,
    user.password
  );

console.log(
  "PASSWORD MATCH:",
  validPassword
);

        if (!validPassword) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role =
          (user as any).role;
      }

      return token;
    },

    async session({
      session,
      token,
    }) {
      (session.user as any).role =
        token.role;

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret:
    process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };