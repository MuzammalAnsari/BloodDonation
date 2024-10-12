import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";
import { User } from "../../../models/User"; // Adjust this if needed

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Using JWT for session management
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
          // Connect to the MongoDB database
          await mongoose.connect(process.env.MONGO_URL);

          // Find the user by email
          const user = await User.findOne({ email });

          if (!user) {
            console.log("User not found");
            return null;
          }

          // Compare the provided password with the stored hashed password
          const passwordOk = await bcrypt.compare(password, user.password);

          if (passwordOk) {
            console.log("Login successful for:", email);
            return user; // Return the user object if the password is correct
          } else {
            console.log("Invalid credentials for:", email);
            return null; // Return null if the password is incorrect
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null; // Return null if there's an error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add the user data to the JWT token
      if (user) {
        token.id = user._id; // Add user ID to the token
        token.email = user.email; // Add email to the token
      }
      return token; // Return the updated token
    },
    async session({ session, token }) {
      // Add the token data to the session
      session.user.id = token.id;
      session.user.email = token.email;
      return session; // Return the session with updated user data
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
