import RecipeCardGrid from "../recipe/search/recipecard-layout/RecipeCardGrid";
import Image from "next/image";
import TitleSection from "./TitleSection";
import React from "react";

type Props = {
    recipesAndAuthors: RecipeAndAuthor[]
    user: UserDB | null
}

export default function SavedRecipes({ recipesAndAuthors, user }: Props) {


    if (recipesAndAuthors.length == 0)
        return (
            <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
                <p className="text-2xl text-center text-gray-700">
                    You have no bookmarked recipes :(
                </p>
            </div>
        );

    return (
        <>
            <div className="mt-8">
                <div className="px-4 md:px-6">
                    <TitleSection titleText='Bookmarked Recipes' titleImg={'/recipes-bookmarked.png'} small={true} withSideparagraph={false}/>
                    <RecipeCardGrid recipesAndAuthors={recipesAndAuthors} user={user} quickview={false} flexGrid={true}/>
                </div>
            </div>
        </>
    );
}
