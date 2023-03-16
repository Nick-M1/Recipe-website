import RecipeDetail from "../../../../components/recipe/detailed_view/RecipeDetail";
import getRecipeAuthorById from "../../../../lib/DB/server/getRecipeAuthorById";
import getUserByEmail from "../../../../lib/DB/server/getUserByEmail";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../../pages/api/auth/[...nextauth]";
import getRecipeById from "../../../../lib/DB/server/getRecipeById";
import {Metadata} from "next";
import {allSortOptions} from "../../../../lib/DB/both/allRecipeSortOptions";
import getAllRecipesAndAuthorsByCategory from "../../../../lib/DB/server/getRecipesAndAuthorsByCategory";


export const dynamic = 'force-dynamic';
export async function generateMetadata({params: {recipeId}}: PageProps): Promise<Metadata> {
    const product = await getRecipeById(recipeId);

    if (product == null)
        return { title: 'Product' }

    return {
        title: product.title,
        openGraph : {
            title: `${product.title} | Recipe Website`,
            description: product.description,
            siteName: "Recipe Website",
            images: [
                {
                    url: product.imgSrc,
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
        recipeId: string
    }
}

export default async function Page({params: {recipeId}}: PageProps) {
    const sessionAuth = await getServerSession(authOptions)
    const user = sessionAuth != null && sessionAuth.user != null ? await getUserByEmail(sessionAuth.user.email!) : null

    const recipeSearchRes = await getRecipeAuthorById(recipeId)
    const recommendedRecipes = await getAllRecipesAndAuthorsByCategory(undefined, allSortOptions[1], 0, 3 )
    const currentTime = Date.now()


    if (recipeSearchRes == null)
        return (
            <div className='py-10 h-screen'>
                <p className='text-center'>
                    Recipe doesn't exist :(
                </p>
            </div>
        )

    return (
        <div>
            <RecipeDetail
                recipe={recipeSearchRes.recipe}
                recommendedRecipes={recommendedRecipes}
                author={recipeSearchRes.author}
                user={user}
                currentTime={currentTime}
            />
        </div>
    );
}