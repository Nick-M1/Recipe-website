import '../styles/globals.css'
import {Montserrat} from "next/font/google"
import {getServerSession} from "next-auth";
import {authOptions} from "../pages/api/auth/[...nextauth]";
import {SessionProvider} from "../components/accounts/SessionProvider";

const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-montserrat'
})

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
