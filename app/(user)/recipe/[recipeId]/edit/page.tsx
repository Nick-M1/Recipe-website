import {getServerSession} from "next-auth";
import {authOptions} from "../../../../../pages/api/auth/[...nextauth]";
import getCategories from "../../../../../lib/DB/both/getCategories";
import RecipeForm from "../../../../../components/recipe/recipe_form/RecipeForm";
import getRecipeById from "../../../../../lib/DB/server/getRecipeById";
import {Metadata} from "next";
import getLabels from "../../../../../lib/DB/both/getLabels";

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
    title: 'Edit'
}

type PageProps = {
    params: {
        recipeId: string
    }
}

export default async function Page({params: {recipeId}}: PageProps) {
    const sessionAuth = await getServerSession(authOptions)

    const categories = getCategories()
    const allLabels = getLabels()
    const recipe = await getRecipeById(recipeId)

    return (
        <div className='py-3'>
            <RecipeForm
                sessionAuth={sessionAuth}
                allCategories={categories}
                allLabels={allLabels}

                buttonLabel="Update"
                editMode={recipe != null}
                recipe={recipe != null ? recipe : undefined}
            />
        </div>
    );
}