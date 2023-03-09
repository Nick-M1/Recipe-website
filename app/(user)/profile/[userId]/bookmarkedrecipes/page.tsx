import {getServerSession} from "next-auth";
import {authOptions} from "../../../../../pages/api/auth/[...nextauth]";
import getUserByEmail from "../../../../../lib/DB/server/getUserByEmail";
import getUserById from "../../../../../lib/DB/server/getUserById";
import getAllRecipesByUser from "../../../../../lib/DB/server/getAllRecipesByUser";
import TitleSection from "../../../../../components/dashboard/TitleSection";
import RecipeCardGrid from "../../../../../components/recipe/search/recipecard-layout/RecipeCardGrid";
import getBookmarkedRecipesByUser from "../../../../../lib/DB/server/getBookmarkedRecipesByUser";

type PageProps = {
    params: {
        userId: string
    }
}

//todo: NOT IMPLEMENTED
export default async function Page({params: {userId}}: PageProps) {
    // Get info for this user
    const sessionAuth = await getServerSession(authOptions)
    const user = sessionAuth != null && sessionAuth.user != null ? await getUserByEmail(sessionAuth.user.email!) : null

    // Get info for the author (the person who owns/runs the page)
    const author = await getUserById(userId)
    if (author == null) throw new Error('Unknown author')

    const recipes = await getBookmarkedRecipesByUser(author)

    return (
        <div>
            <section>
                <div className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-14">
                    <TitleSection titleText={`${author.name}'s Bookmarked Recipes`} titleImg={'/recipes-bookmarked.png'} small={false} withSideparagraph={false}/>
                    <RecipeCardGrid recipesAndAuthors={recipes} quickview={true} user={user} flexGrid={true}/>
                </div>
            </section>
        </div>
    );
}