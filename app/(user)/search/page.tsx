import React from 'react';
import Recipes from "../../../components/recipe/Recipes";
import getRecipes from "../../../lib/DB/getRecipes";


export default function Page() {
    const recipes = getRecipes()

    return (
        <div>
            <Recipes recipes={recipes}/>
        </div>
    );
}