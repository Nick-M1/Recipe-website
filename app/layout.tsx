import '../styles/globals.css'
import {Montserrat} from "next/font/google"
import {getServerSession} from "next-auth";
import {authOptions} from "../pages/api/auth/[...nextauth]";
import {SessionProvider} from "../components/accounts/SessionProvider";
import {Metadata} from "next";

const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-montserrat'
})

export const metadata: Metadata = {
    title: {
        default: 'Recipe Website',
        template: '%s | Recipe Website',
    },
    description: 'Recipe Website, for users to post their recipes to share online',
    keywords: ['Next.js', 'React', 'JavaScript', 'Food', 'Recipes', 'Cooking', 'Social media'],
    authors: [{name: 'Nick'}],
    icons: '/brand-logo.png',

    openGraph : {
        siteName: "Recipe Website",
        images: [
            {
                url: '/backgrounds/img1.png',
                width: 1800,
                height: 1600
            }
        ],
        locale: 'en-GB',
        type: 'website',
    }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    const session = await getServerSession(authOptions)

    return (
        <html lang="en" className='scrollbar'>
            <body className={`${montserrat.className} h-full`}>
                <SessionProvider session={session}>
                    {children}
                </SessionProvider>
            </body>
        </html>
    )
}
