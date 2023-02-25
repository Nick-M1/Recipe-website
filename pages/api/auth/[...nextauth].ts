import NextAuth, {NextAuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook";
import getRecipeAuthorById from "../../../lib/DB/server/getRecipeAuthorById";
import getUserByEmail from "../../../lib/DB/server/getUserByEmail";
import addUser from "../../../lib/DB/server/addUser";

export const authOptions: NextAuthOptions = {
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
        async signIn({ user, account, profile }) {          // profile.given_name and profile.family_name   ?? useful
            // console.log(user, account, profile)

            if (user.email == null) {
                console.log("User's email not provided. Can't log in")
                return false
            }

            if ( (await getUserByEmail(user.email)) == null )
                await addUser(user)

            return true
        },

        async redirect({ url, baseUrl }) {
            return '/'                      // NOTE:    url = '/',  baseURL = 'http://localhost:3000'
        },
    },
}

export default NextAuth(authOptions)