import React from 'react';
import Recipes from "../../../../components/recipe/search/Recipes";
import getAllRecipes from "../../../../lib/DB/server/getAllRecipes";
import getUserByEmail from "../../../../lib/DB/server/getUserByEmail";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../../pages/api/auth/[...nextauth]";

export const dynamic = 'force-dynamic'

type PageProp = {
    params: {
        searchTerm: string[]
    }
}

export default async function Page({params: {searchTerm}}: PageProp) {
    const sessionAuth = await getServerSession(authOptions)
    const user = sessionAuth != null && sessionAuth.user != null ? await getUserByEmail(sessionAuth.user.email!) : null

    const recipesAndAuthors = await getAllRecipes()

    return (
        <div>
            <Recipes recipesAndAuthors={recipesAndAuthors} user={user}/>
        </div>
    );
}