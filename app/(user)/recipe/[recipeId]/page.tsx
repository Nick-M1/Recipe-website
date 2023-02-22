import React from 'react';
import RecipeDetail from "../../../components/recipe/RecipeDetail";
import {getRecipes} from "../../../lib/gettersDB";

type PageProps = {
    params: {
        recipeId: number
    }
}

export default function Page({ params: {recipeId} }: PageProps) {
    const recipe = getRecipes()[recipeId-1]

    return (
        <div>
            <RecipeDetail recipe={recipe}/>
        </div>
    );
}