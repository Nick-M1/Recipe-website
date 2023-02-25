import '../../styles/globals.css'
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import {getServerSession} from "next-auth";
import {authOptions} from "../../pages/api/auth/[...nextauth]";

export default async function Layout({children}: { children: React.ReactNode }) {
    const sessionAuth = await getServerSession(authOptions)

    return (
        <div>
            <Header sessionAuth={sessionAuth}/>
            <div>
                {children}
            </div>
            <Footer/>

        </div>
    )
}