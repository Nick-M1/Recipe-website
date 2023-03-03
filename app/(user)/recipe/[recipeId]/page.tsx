import RecipeDetail from "../../../../components/recipe/detailed_view/RecipeDetail";
import getRecipeAuthorById from "../../../../lib/DB/server/getRecipeAuthorById";
import getUserByEmail from "../../../../lib/DB/server/getUserByEmail";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../../pages/api/auth/[...nextauth]";
import getRecipeById from "../../../../lib/DB/server/getRecipeById";
import {Metadata} from "next";
import getAllRecipes from "../../../../lib/DB/server/getAllRecipes";
import getAllRecipesAndAuthorsByQuery from "../../../../lib/DB/server/getRecipesAndAuthorsByQuery";
import {allSortOptions} from "../../../../lib/DB/both/allRecipeSortOptions";

export async function generateMetadata({params: {recipeId}}: PageProps): Promise<Metadata> {
    const product = await getRecipeById(recipeId);
    return { title: product == null ? 'Product' : product.title }
}

// FOR PRODUCTION:
// export const revalidate = 120            // set very high, only revalidate when recipe is updated by API call
//
// // Server-side prebuilding pages
// export async function generateStaticParams() {
//     const recipes = await getAllRecipes()
//     return recipes.map(recipe => ({
//         recipeId: recipe.id
//     }));
// }
//
// FOR DEV:
export const dynamic = 'force-dynamic'

// export const generateStaticParams =
//     process.env.NODE_ENV !== 'development'
//         ? async () => {
//             const recipes = await getAllRecipes()
//             return recipes.map(recipe => ({
//                 recipeId: recipe.id
//             }));
//         }
//         : undefined
//
// export const dynamic = 'auto'

type PageProps = {
    params: {
        recipeId: string
    }
}

export default async function Page({params: {recipeId}}: PageProps) {
    const sessionAuth = await getServerSession(authOptions)
    const user = sessionAuth != null && sessionAuth.user != null ? await getUserByEmail(sessionAuth.user.email!) : null

    const recipeSearchRes = await getRecipeAuthorById(recipeId)
    const recommendedRecipes = await getAllRecipesAndAuthorsByQuery(undefined, allSortOptions[1], 0, 3 )
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

// import matter from 'gray-matter'
// import ReactMarkdown from "react-markdown";

// const content = await import('./demo.md')
// const data = matter(content.default)