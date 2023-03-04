import RecipeCard from "../recipe/search/RecipeCard";
import Image from "next/image";
import TitleSection from "./TitleSection";
import React from "react";

type Props = {
    recipesAndAuthors: RecipeAndAuthor[]
    user: UserDB | null
}

export default function MyRecipes({ recipesAndAuthors, user }: Props) {


    if (recipesAndAuthors.length == 0)
        return (
            <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
                <p className="text-xl text-center text-gray-700">
                    You have no recipes uploaded. Start posting!
                </p>
            </div>
        );

    return (
        <>
            <div className="mt-8">
                <div className="px-4 md:px-6">
                    <TitleSection titleText='My Recipes' titleImg={'/recipes-mine.png'} small={true} withSideparagraph={false}/>
                    <RecipeCard recipesAndAuthors={recipesAndAuthors} user={user} quickview={false} flexGrid={true}/>
                </div>
            </div>
        </>
    );
}
