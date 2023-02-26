import RecipeDetail from "../../../../components/recipe/detailed_view/RecipeDetail";
import getRecipeAuthorById from "../../../../lib/DB/server/getRecipeAuthorById";
import getUserByEmail from "../../../../lib/DB/server/getUserByEmail";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../../pages/api/auth/[...nextauth]";
import getRecipeById from "../../../../lib/DB/server/getRecipeById";
import {Metadata} from "next";

export async function generateMetadata({params: {recipeId}}: PageProps): Promise<Metadata> {
    const product = await getRecipeById(recipeId);
    return { title: product == null ? 'Product' : product.title }
}

export const dynamic = 'force-dynamic'

type PageProps = {
    params: {
        recipeId: string
    }
}

export default async function Page({params: {recipeId}}: PageProps) {
    const sessionAuth = await getServerSession(authOptions)
    const user = sessionAuth != null && sessionAuth.user != null ? await getUserByEmail(sessionAuth.user.email!) : null

    const recipeSearchRes = await getRecipeAuthorById(recipeId)

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
            <RecipeDetail recipe={recipeSearchRes.recipe} author={recipeSearchRes.author} user={user}/>
        </div>
    );
}

// import matter from 'gray-matter'
// import ReactMarkdown from "react-markdown";

// const content = await import('./demo.md')
// const data = matter(content.default)