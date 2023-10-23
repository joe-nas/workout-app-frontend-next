import axios from "axios";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {},
  async signIn({ profile }) {
    try {
      // check if user exists in database
      axios.get("/api/user/" + profile.id);
      //if not create a new user
    } catch (e) {
      console.log(e);
    }
  },
});

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
