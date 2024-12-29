import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/user";

const ONE_DAY_IN_SECONDS = 24 * 60 * 60; // 86400 seconds

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.time("NextAuth session callback");
      console.log("SESSION CALLBACK:", session);
      console.log("USER EMAIL:", session?.user.email);

      const sessionUser = await User.findOne({
        email: session?.user.email,
      });

      console.log("SESSION USER:", sessionUser);

      if (sessionUser) session.user.id = sessionUser._id.toString();

      console.timeEnd("NextAuth session callback");
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // Check if user exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
