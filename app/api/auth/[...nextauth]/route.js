import chalk from "chalk";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { getUser, createUser, checkIfUserExists } from "../../UserService";
import jwt from "jsonwebtoken";

/**
 * This file contains the NextAuth configuration for authentication providers, callbacks and JWT generation.
 * @module /f:/Coding/JavaScript/workout-app-frontend-next/app/api/auth/[...nextauth]/route.js
 */

/**
 * The NextAuth handler function that configures authentication providers, callbacks and JWT generation.
 * @function
 * @param {Object} options - An object containing the following properties:
 * @param {Array} options.providers - An array of authentication provider objects.
 * @param {Object} options.callbacks - An object containing callback functions for authentication.
 * @param {Function} options.callbacks.session - A function that updates the session with user data from the database.
 * @param {Function} options.callbacks.signIn - A function that signs in the user for authentication.
 * @param {Function} options.callbacks.jwt - A function that generates a JSON Web Token (JWT) for the authenticated user.
 * @returns {Object} - The NextAuth handler function.
 */


// const secretKey = Buffer.from(process.env.IRONDELIRIUM_SECRET, 'base64')
const secretKey = process.env.IRONDELIRIUM_SECRET
const signInOption = { expiresIn: '5min', algorithm: 'HS256' }
const sessionOption = { expiresIn: '1h', algorithm: 'HS256' }
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: ["https://www.googleapis.com/auth/userinfo.profile"],
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // scope: 'read:user'
    }),
  ],
  callbacks: {
    /**
     * Updates the session with user data from the database.
     * @function
     * @async
     * @param {Object} options - The options object.
     * @param {Object} options.session - The current session object.
     * @param {Object} options.token - The token object containing user data.
     * @returns {Object} - The updated session object.
     */
    async session({ session, user, token }) {

      // 1. get user data from database
      try {
        const sessionUser = await fetch(`http://localhost:8080/api/user/${token.sub}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token.jwt}`,
            "Content-Type": "application/json",
            Origin: "http://localhost:3000",
          }
        })

        // 2. if user exists update session with user data
        if (sessionUser.status === 200) {
          const sessionUserData = await sessionUser.json()
          session = { ...session, user: sessionUserData, jwt: token.jwt }
          return session
        }
      } catch (err) {
        console.log(chalk.bgRedBright("🥩🥩🥩 session: ", err));
      }
      return session
    },


    /**
     * Sign in function for authentication.
     * @function
     * @async
     * @param {Object} options - The options object.
     * @param {Object} options.account - The account object.
     * @param {Object} options.profile - The profile object.
     * @param {Object} options.user - The user object.
     * @param {Object} options.credentials - The credentials object.
     * @returns {boolean} - Returns true if the user is signed in.
     */
    async signIn({ account, profile, user }) {
      const oauthId = account.providerAccountId;
      const username = profile.name.replace(" ", "");
      const email = profile.email;
      const provider = account.provider;

      var newUser = {}
      var userExists = false;

      if (account && profile) {
        newUser = {
          username: username,
          email: email,
          oauthId: oauthId,
          // sub: oauthId,
          oauthDetails: {
            oauthProvider: provider,
            oauthId: oauthId,
          }
        }
      }

      var myJWT = jwt.sign(newUser, secretKey, signInOption)

      // 1. check if user exists and return true if they do
      try {
        userExists = await checkIfUserExists(newUser.oauthId, myJWT)

        if (userExists) {
          console.log(chalk.bgRedBright("🥩🥩🥩 signIn: userExists: ", userExists));
          return true;

          // 2. if they don't exist create user and return true
        } else if (!userExists) {
          console.log(chalk.bgRedBright("🥩🥩🥩 signIn: userExists: ", userExists));
          console.log(chalk.bgRedBright("🥩🥩🥩 signIn: JWT: ", myJWT));

          await createUser(newUser, myJWT)
          return true;
        }
      } catch (err) {
        // 3. if there's an error return false
        console.log(chalk.bgRedBright("🥩🥩🥩 signIn: ", err));
        return false;
      }
    },

    /**
     * This function is used to generate a JSON Web Token (JWT) for the authenticated user.
     * @function
     * @async
     * @param {Object} options - An object containing the following properties:
     * @param {Object} options.token - The current JWT for the user.
     * @param {Object} options.user - The user object returned by the authentication provider.
     * @param {Object} options.account - The account object returned by the authentication provider.
     * @param {Object} options.session - The session object returned by the authentication provider.
     * @param {Object} options.profile - The user profile object returned by the authentication provider.
     * @returns {Object} - A new JWT object with the following properties:
     * @returns {string} jwt - The JWT for the authenticated user.
     * @returns {string} oauthId - The ID of the user on the authentication provider.
     * @returns {string} oauthProvider - The name of the authentication provider.
     * @returns {string} image - The URL of the user's profile picture.
     */
    async jwt({ token, user, account, session, profile, isNewUser }) {

      const isSignIn = user ? true : false;
      if (isSignIn) {
        token = {
          ...token,
          oauthProvider: account.provider,
          username: user.name.replace(" ", ""),
          jwt: jwt.sign({
            email: user.email,
            sub: account.providerAccountId,
            oauthDetails: {
              oauthProvider: account.provider,
              oauthId: account.providerAccountId,
            },
            username: user.name.replace(" ", "")
          }, secretKey, sessionOption)
        }
      } else if (Date.now() / 1000 > token.exp - (60 * 5)) {
        token = {
          ...token,
        }
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export {
  authOptions,
  handler,
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
};