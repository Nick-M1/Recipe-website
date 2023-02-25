import '../../styles/globals.css'
import Header from "../../components/layouts/Header";
import {getServerSession} from "next-auth";
import {authOptions} from "../../pages/api/auth/[...nextauth]";
import getUserByEmail from "../../lib/DB/server/getUserByEmail";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import Footer from "../../components/layouts/Footer";

export default async function Layout({children}: { children: React.ReactNode }) {
    const sessionAuth = await getServerSession(authOptions)
    const userDB = sessionAuth == null ? null : await getUserByEmail(sessionAuth!.user!.email!)

    return (
        <div>
            <Header sessionAuth={sessionAuth} userDB={userDB} />
            <DashboardLayout user={userDB} />
            <div className='lg:pl-64 py-3 h-screen'>
                {children}
            </div>
            <div className='lg:pl-64 pt-10'><Footer/></div>
        </div>
    )
}