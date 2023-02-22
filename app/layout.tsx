import '../styles/globals.css'
import {Montserrat} from "@next/font/google"

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


    return (
        <html lang="en" className='scrollbar'>
            <body className={`${montserrat.className} h-full`}>
                {/*<SessionProvider session={session}>*/}
                    {children}
                {/*</SessionProvider>*/}
            </body>
        </html>
    )
}
