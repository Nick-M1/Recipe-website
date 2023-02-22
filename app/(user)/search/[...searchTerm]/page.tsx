import React from 'react';
import Recipes from "../../../components/recipe/Recipes";
import getRecipes from "../../../lib/DB/getRecipes";

type PageProps = {
    searchParams: {
        query: string
    }
}

export default function Page({searchParams: {query}}: PageProps) {
    // console.log(query)      //todo use this query
    const recipes = getRecipes()

    return (
        <div>
            <Recipes recipes={recipes}/>
        </div>
    );
}