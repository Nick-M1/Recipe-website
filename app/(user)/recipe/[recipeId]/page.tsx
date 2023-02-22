import React from 'react';
import RecipeDetail from "../../../../components/recipe/RecipeDetail";
import getRecipes from "../../../../lib/DB/getRecipes";

import matter from 'gray-matter'
import ReactMarkdown from "react-markdown";

export const dynamic = 'force-dynamic'

type PageProps = {
    params: {
        recipeId: number
    }
}

export default async function Page({params: {recipeId}}: PageProps) {
    const recipe = getRecipes()[recipeId - 1]

    // const content = await import('./demo.md')
    // const data = matter(content.default)

    return (
        <div>
            {/*<ReactMarkdown>{data.content}</ReactMarkdown>*/}
            <RecipeDetail recipe={recipe}/>
        </div>
    );
}