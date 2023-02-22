import React from 'react';
import Recipes from "../../../../components/recipe/Recipes";
import getRecipes from "../../../../lib/DB/getRecipes";

type PageProp = {
    params: {
        searchTerm: string[]
    }
}

export default function Page({params: {searchTerm}}: PageProp) {
    const recipes = getRecipes()

    return (
        <div>
            <Recipes recipes={recipes}/>
        </div>
    );
}