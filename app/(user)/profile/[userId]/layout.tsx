import {Metadata} from "next";
import UserProfileTopbanner from "../../../../components/profileview/UserProfileTopbanner";
import getUserById from "../../../../lib/DB/server/getUserById";

export const metadata: Metadata = {
    title: 'Profile'        //todo: make dynamic
}

type LayoutProps = {
    children: React.ReactNode,
    params: {
        userId: string
    }
}

export default async function Layout({ children, params: { userId }}: LayoutProps) {

    // Get info for the author (the person who owns/runs the page)
    const author = await getUserById(userId)

    if (author == null)
        return (
            <h1 className='py-10 text-center h-screen'>This user does not exist :(</h1>
        )

    return (
        <div>
            <UserProfileTopbanner author={author}/>
            {children}
        </div>
    )
}