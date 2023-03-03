import getUserById from "../../../../lib/DB/server/getUserById";
import UserProfile from "../../../../components/profileview/UserProfile";
import getAllRecipesByUser from "../../../../lib/DB/server/getAllRecipesByUser";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../../pages/api/auth/[...nextauth]";
import getUserByEmail from "../../../../lib/DB/server/getUserByEmail";
import {Metadata} from "next";
import getRecipeById from "../../../../lib/DB/server/getRecipeById";

export const dynamic = 'force-dynamic'
export async function generateMetadata({params: {userId}}: PageProps): Promise<Metadata> {
    const author = await getUserById(userId);
    return { title: author == null ? 'User Profile' : author.name }
}

type PageProps = {
    params: {
        userId: string
    }
}

export default async function Page({params: { userId }}: PageProps) {
    const sessionAuth = await getServerSession(authOptions)
    const user = sessionAuth != null && sessionAuth.user != null ? await getUserByEmail(sessionAuth.user.email!) : null

    const author = await getUserById(userId)

    if (author == null)
        return (
            <h1 className='py-10 text-center h-screen'>This user does not exist :(</h1>
        )

    const recipes = await getAllRecipesByUser(author.email)
    const recipesAndAuthors: RecipeAndAuthor[] = recipes.map(recipe => {
        return {recipe, author: author}
    })

    return (
        <div>
            <UserProfile user={user} author={author} recipesAndAuthors={recipesAndAuthors} />
        </div>
    )
}