import RecipeDetail from "../../../../components/recipe/detailed_view/RecipeDetail";
import getRecipeById from "../../../../lib/DB/server/getRecipeById";
import getUserByEmail from "../../../../lib/DB/server/getUserByEmail";

export const dynamic = 'force-dynamic'

type PageProps = {
    params: {
        recipeId: string
    }
}

export default async function Page({params: {recipeId}}: PageProps) {
    const recipe = await getRecipeById(recipeId)
    const user = await getUserByEmail('test-email')

    if (recipe == null)
        return (
            <div className='py-10 h-screen'>
                <p className='text-center'>
                    Recipe doesn't exist :(
                </p>
            </div>
        )

    if (user == null)
        throw new Error('User not found')


    return (
        <div>
            <RecipeDetail recipe={recipe} user={user}/>
        </div>
    );
}

// import matter from 'gray-matter'
// import ReactMarkdown from "react-markdown";

// const content = await import('./demo.md')
// const data = matter(content.default)