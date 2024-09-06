import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import clientPromise from "../../../../lib/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { User } from "../../../models/User";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        try {
          mongoose.connect(process.env.MONGO_URL);  
          const user = await User.findOne({ email: credentials.email });
          console.log("User found:", user);
          
          if (!user) {
            console.log("User not found");
            return null;
          }

          const passwordOk = await bcrypt.compareSync(password, user.password);
          if (passwordOk) {
            console.log("Login successful for:", email);
            return user;
          } else {
            console.log("Invalid credentials for:", email);
            return null;
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id; // Add user ID to the token
        token.email = user.email; // Add email to the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
