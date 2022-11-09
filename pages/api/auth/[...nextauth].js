import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";
import { hygraphClient } from "../../../lib/hygraph";
import { gql } from "graphql-request";
import jwt from "jsonwebtoken";

const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    user: heyvoilaUser(where: { email: $email }, stage: DRAFT) {
      id
      password
      email
      nom
    }
  }
`;

const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $password: String!) {
    newUser: createheyvoilaUser(data: { email: $email, password: $password }) {
      id
    }
  }
`;

export default NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "E-mail",

      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jack.sparrow@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      authorize: async ({ email, password }) => {
        const { user } = await hygraphClient.request(GetUserByEmail, {
          email,
        });

        if (!user) {
          const { newUser } = await hygraphClient.request(
            CreateNextUserByEmail,
            {
              email,
              password: await hash(password, 12),
            }
          );

          return {
            id: newUser.id,
            username: email,
            email,
          };
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
          throw new Error("Wrong credentials. Try again.");
        }

        return {
          id: user.id,
          username: user.email,
          email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.userId = token.sub;
      return Promise.resolve(session);
    },
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code
    logo: "/HeyVoila_Logo.png", // Absolute URL to image
    buttonText: "", // Hex color code
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: "/signout",
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});
