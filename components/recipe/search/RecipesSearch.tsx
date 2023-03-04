
import React, {useEffect, useState} from "react";
// import { useDispatch, useSelector } from "react-redux";

import RecipeCard from "./RecipeCard";
import Image from "next/image";
import DropdownComponent from "../../interactive_components/DropdownComponent";
import {allSortOptions} from "../../../lib/DB/both/allRecipeSortOptions";
import Pagination from "../../interactive_components/Pagination/Pagination";
import RecipeFilterPopover from "./RecipeFilterPopover";
import TitleSection from "../../dashboard/TitleSection";

type Props = {
    pagenumber: number
    lastPageIndex: number

    urlBasepath: string
    currentUrlWithoutSort: string
    currentSort: string
    recipesAndAuthors: RecipeAndAuthor[]

    allCategories: Category[]

    user: UserDB | null
}


export default function RecipesSearch({ pagenumber, lastPageIndex, urlBasepath, currentUrlWithoutSort, currentSort, recipesAndAuthors, user, allCategories }: Props) {
    if (recipesAndAuthors.length === 0)
        return (
            <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
                <p className="text-3xl text-center text-gray-700">
                    No recipes can be found for this query :(
                </p>
            </div>
        );

    return (
        <>
            <div className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-14">
                <TitleSection titleText='Recipes' titleImg={'/ingredients.png'} small={false} withSideparagraph={true}/>
                <div className='flex flex-row w-full -ml-4 lg:ml-1 mb-2 justify-between'>
                    <div><RecipeFilterPopover allCategories={allCategories} currentSort={currentSort} /></div>
                    <div><DropdownComponent optionNames={allSortOptions} currentSort={currentSort} currentUrlWithoutSort={currentUrlWithoutSort} /></div>
                </div>

                <RecipeCard recipesAndAuthors={recipesAndAuthors} quickview={true} user={user} flexGrid={true}/>

                <div className='float-right pt-4'>
                    {/* todo: FIX URL WITH FUNCTION UTILS */}
                    <Pagination urlpathTo={`${urlBasepath}ordering=${currentSort}&pagenumber=`} currentPage={pagenumber} lastPage={lastPageIndex}/>
                </div>

            </div>
        </>
    );
}
