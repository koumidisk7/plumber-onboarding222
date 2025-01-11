import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"

export default NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
      // baseURL: process.env.AUTH0_BASE_URL,
      //issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
            // secret: process.env.AUTH0_SECRET,
      // issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
      // clientID: process.env.AUTH0_CLIENT_ID,
      // clientSecret: process.env.AUTH0_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
        if (token) {

        session.user.username = token.username;

      session.accessToken = token.accessToken
        }
      return session
    }
  }
})

