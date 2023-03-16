import '../../styles/globals.css'
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import {getServerSession} from "next-auth";
import {authOptions} from "../../pages/api/auth/[...nextauth]";
import getUserByEmail from "../../lib/DB/server/getUserByEmail";
import getAllRecipes from "../../lib/DB/server/getAllRecipes";

export default async function Layout({children}: { children: React.ReactNode }) {
    const sessionAuth = await getServerSession(authOptions)
    const userDB = sessionAuth == null ? null : await getUserByEmail(sessionAuth!.user!.email!)

    const allRecipes = await getAllRecipes()

    return (
        <div>
            <Header sessionAuth={sessionAuth} userDB={userDB} allRecipes={allRecipes} />
            <div>
                {children}
            </div>
            <Footer/>
        </div>
    )
}