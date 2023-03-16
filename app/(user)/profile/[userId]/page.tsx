import getUserById from "../../../../lib/DB/server/getUserById";
import getAllRecipesByUser from "../../../../lib/DB/server/getAllRecipesByUser";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../../pages/api/auth/[...nextauth]";
import getUserByEmail from "../../../../lib/DB/server/getUserByEmail";
import {Metadata} from "next";
import TitleSection from "../../../../components/dashboard/TitleSection";
import RecipeCardGrid from "../../../../components/recipe/search/recipecard-layout/RecipeCardGrid";
import Link from "next/link";
import getBookmarkedRecipesByUser from "../../../../lib/DB/server/getBookmarkedRecipesByUser";

export const dynamic = 'force-dynamic'
export async function generateMetadata({params: { userId }}: PageProps): Promise<Metadata> {
    const author = await getUserById(userId);
    if (author == null)
        return { title: 'User Profile' }

    return {
        title: author.name,
        openGraph : {
            title: `${author.name} Profile | Recipe Website`,
            description: author.biography,
            siteName: "Recipe Website",
            images: [
                {
                    url: author.pic,
                    width: 1800,
                    height: 1600
                }
            ],
            locale: 'en-GB',
            type: 'website',
        }
    }
}

type PageProps = {
    params: {
        userId: string
    }
}

export default async function Page({params: { userId }}: PageProps) {
    // Get info for this user
    const sessionAuth = await getServerSession(authOptions)
    const user = sessionAuth != null && sessionAuth.user != null ? await getUserByEmail(sessionAuth.user.email!) : null

    // Get info for the author (the person who owns/runs the page)
    const author = await getUserById(userId)
    if (author == null) throw new Error('Unknown author')

    // Recipes created by the author
    const createdrecipes = await getAllRecipesByUser(author.email)
    const createdRecipesAndAuthors: RecipeAndAuthor[] = createdrecipes.slice(0, 3).map(recipe => {
        return {recipe, author: author}
    })

    // Recipes bookmarked by the author
    const bookmarkedRecipesAndAuthors = await getBookmarkedRecipesByUser(author, 3)

    //todo: Create 2 carousells -> 1 for 'Created' & 1 for 'bookmarked' recipes

    return (
        <div className='pt-6 pb-3 [&>*]:py-12'>
            <section>
                <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                    <TitleSection titleText={`${author.name}'s Created Recipes`} titleImg={'/ingredients.png'} small={true} withSideparagraph={false}/>
                    <RecipeCardGrid recipesAndAuthors={createdRecipesAndAuthors} quickview={true} user={user} flexGrid={true}/>
                    <div className='flex justify-end mt-2'>
                        <Link href={`/profile/${author.id}/createdrecipes`} className='tracking-wider text-gray-400 hover:text-gray-600 smooth-transition italic'>Show more...</Link>
                    </div>
                </div>
            </section>

            <section>
                <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                    <TitleSection titleText={`${author.name}'s Bookmarked Recipes`} titleImg={'/recipes-bookmarked.png'} small={true} withSideparagraph={false}/>
                    <RecipeCardGrid recipesAndAuthors={bookmarkedRecipesAndAuthors} quickview={true} user={user} flexGrid={true}/>
                    <div className='flex justify-end mt-2'>
                        <Link href={`/profile/${author.id}/bookmarkedrecipes`} className='tracking-wider text-gray-400 hover:text-gray-600 smooth-transition italic'>Show more...</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}