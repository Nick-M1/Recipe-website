import {getServerSession} from "next-auth";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";
import getUserByEmail from "../../../lib/DB/server/getUserByEmail";
import Timeline from "../../../components/dashboard/Timeline";
import SigninRedirecting from "../../../components/accounts/SigninRedirecting";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: 'Dashboard'
}

export default async function Page() {
    // const sessionAuth = await getServerSession(authOptions)
    // const userDB = sessionAuth == null ? null : await getUserByEmail(sessionAuth!.user!.email!)

    return (
        <div>
            <Timeline/>
        </div>
    );
}