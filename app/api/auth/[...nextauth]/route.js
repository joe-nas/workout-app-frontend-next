import chalk from "chalk";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { getUser, createUser } from "../../UserService";
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
    async session({ session, token }) {
      // get user data from database
      try {
        const sessionUser = await getUser(token.oauthId, token.jwt);
        console.log(JSON.stringify(token));
        // console.log(chalk.bgGreenBright("Session User:", JSON.stringify(sessionUser)))
        if (sessionUser) {
          console.log(
            chalk.bgGreenBright(
              `session: getUser: status code ${JSON.stringify(
                sessionUser.status
              )} - ${JSON.stringify(sessionUser.data)}`
            )
          );
          return {
            ...session,
            user: {
              ...session.user,
              mongoId: sessionUser.userID,
              jwt: token.jwt,
              oauthId: token.oauthId,
              provider: token.oauthProvider,
              image: token.picture,
            },
          };
        }
      } catch (err) {
        err.status === 404
          ? console.log(chalk.bgRedBright("User not found"))
          : console.log(chalk.bgRedBright(err.status));
      }
      console.log(chalk.bgRedBright("Session User not found"));
      return session;
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
    async signIn({ account, profile, user, credentials }) {
      const oauthId = account.providerAccountId;
      const username = profile.name.replace(" ", "");
      const email = profile.email;
      const provider = account.provider;

      var userExists = false;


      // console.log(chalk.bgGreenBright("signIn: account:", JSON.stringify(account)));
      // console.log(chalk.bgGreenBright("signIn: profile:", JSON.stringify(profile)));
      // console.log(chalk.bgGreenBright("signIn: user:", JSON.stringify(user)));
      if (provider === "github") {
        const newUser = {
          email: email,
          username: username,
          oauthId: oauthId,
          provider: provider,
        };

        const options = {
          expiresIn: "1h",
        }

        const token = jwt.sign(newUser, process.env.GITHUB_SECRET, options);
        console.log(chalk.bgGreenBright("signIn: token:", JSON.stringify(token)));
      }


      try {
        const userResponse = await getUser(profile.sub);
        console.log(
          chalk.blueBright(
            `signIn: getUser: status code ${JSON.stringify(
              userResponse.status
            )} - ${JSON.stringify(userResponse.data)}`
          )
        );
        if (userResponse.status === 200) {
          userExists = true;
        }
      } catch (err) {
        if (err.response.status !== 404) {
          console.log(chalk.bgRedBright("Error"));
        }
      }

      // if the user does not exist try to create a new user
      if (userExists === false) {
        const newUser = {
          email: email,
          username: username,
          oauthId: oauthId,
          oauthDetails: {
            oauthProvider: provider,
            oauthId: oauthId,
          },
        };
        try {
          const newUserResponse = await createUser(JSON.stringify(newUser));
          console.log(
            chalk.bgGreenBright(
              `signIn: createUser: status code ${newUserResponse.status
              } - ${JSON.stringify(newUserResponse.data)}`
            )
          );
        } catch (err) {
          console.log(
            chalk.bgRedBright(
              `signIn createUser: error status: ${err.response.status}`
            )
          );
        }
      }
      return true;
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
    async jwt({ token, user, account, session, profile }) {
      // console.log(chalk.bgGreenBright("signIn: account:", JSON.stringify(account)));
      // console.log(chalk.bgBlueBright("signIn: profile:", JSON.stringify(profile)));
      // console.log(chalk.bgRedBright("signIn: user:", JSON.stringify(user)));
      // console.log(chalk.bgYellowBright("signIn: token:", JSON.stringify(token)));
      // console.log(chalk.magentaBrightBright("signIn: session:", JSON.stringify(session)));


      if (account && account.provider === "google" && user) {
        return {
          ...token,
          jwt: account.id_token,
          oauthId: account.providerAccountId,
          oauthProvider: account.provider,
          image: profile.picture,
        };
      }
      if (account && account.provider === "github" && user) {
        return {
          ...token,
          // jwt: account.id_token,
          oauthId: account.providerAccountId,
          oauthProvider: account.provider,
          image: profile.avatar_url,
        };
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