import React from 'react';
import Recipes from "../../../components/recipe/search/Recipes";
import getAllRecipes from "../../../lib/DB/server/getAllRecipes";
import getUserByEmail from "../../../lib/DB/server/getUserByEmail";

export const dynamic = 'force-dynamic'

export default async function Page() {
    const recipes = await getAllRecipes()
    const user = await getUserByEmail('test-email')

    if (user == null)
        throw new Error('User not found')

    return (
        <div>
            <Recipes recipes={recipes} user={user}/>
        </div>
    );
}