import UpdateProfile from "../../../components/dashboard/UpdateProfile";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";
import getUserByEmail from "../../../lib/DB/server/getUserByEmail";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Update Profile'
}

export default async function Page() {
    const sessionAuth = await getServerSession(authOptions)
    const userDB = sessionAuth == null ? null : await getUserByEmail(sessionAuth!.user!.email!)

    return (
        <div>
            <UpdateProfile user={userDB!}/>
        </div>
    );
}