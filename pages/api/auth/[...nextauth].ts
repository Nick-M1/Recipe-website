import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID!,
            clientSecret: process.env.FACEBOOK_SECRET!,
        }),
        // ...add more providers here
    ],

    pages: {
        signIn: '/signin'
    },

    callbacks: {
        async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
            return '/'
        }
    },
}

export default NextAuth(authOptions)