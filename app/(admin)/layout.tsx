import '../../styles/globals.css'
import Header from "../../components/layouts/Header";
import {getServerSession} from "next-auth";
import {authOptions} from "../../pages/api/auth/[...nextauth]";
import getUserByEmail from "../../lib/DB/server/getUserByEmail";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Footer from "../../components/layouts/Footer";
import {Metadata} from "next";
import getAllRecipes from "../../lib/DB/server/getAllRecipes";

export const metadata: Metadata = {
    title: 'Dashboard'
}

export default async function Layout({children}: { children: React.ReactNode }) {
    const sessionAuth = await getServerSession(authOptions)
    const userDB = sessionAuth == null ? null : await getUserByEmail(sessionAuth!.user!.email!)

    const allRecipes = await getAllRecipes()

    return (
        <div>
            <Header sessionAuth={sessionAuth} userDB={userDB} allRecipes={allRecipes} />
            <DashboardLayout user={userDB} />
            <div className='lg:pl-64 py-3 min-h-screen'>
                {children}
            </div>
            <div className='lg:pl-64 pt-10'><Footer/></div>
        </div>
    )
}