import React from 'react';
import getCategories from "../../../lib/DB/server/getCategories";
import RecipeCreate from "../../../components/recipe/recipe_form/RecipeCreate";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";

export default async function Page() {
    const sessionAuth = await getServerSession(authOptions)
    const categories = getCategories()

    return (
        <div>
            <RecipeCreate sessionAuth={sessionAuth} categories={categories} />
        </div>
    );
}