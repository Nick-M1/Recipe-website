import React from 'react';
import Recipes from "../../../../components/recipe/search/Recipes";
import getAllRecipesAndAuthors from "../../../../lib/DB/server/getAllRecipesAndAuthors";
import getUserByEmail from "../../../../lib/DB/server/getUserByEmail";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../../pages/api/auth/[...nextauth]";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Search'
}

export const dynamic = 'force-dynamic'

type PageProp = {
    params: {
        searchTerm: string[]
    }
}

export default async function Page({params: {searchTerm}}: PageProp) {
    const sessionAuth = await getServerSession(authOptions)
    const user = sessionAuth != null && sessionAuth.user != null ? await getUserByEmail(sessionAuth.user.email!) : null

    const recipesAndAuthors = await getAllRecipesAndAuthors()

    return (
        <div>
            <Recipes recipesAndAuthors={recipesAndAuthors} user={user}/>
        </div>
    );
}