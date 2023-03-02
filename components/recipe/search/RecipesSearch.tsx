
import {useEffect, useState} from "react";
// import { useDispatch, useSelector } from "react-redux";

import RecipeCard from "./RecipeCard";
import Image from "next/image";
import DropdownComponent from "../../interactive_components/DropdownComponent";
import {allSortOptions} from "../../../lib/utils/allRecipeSortOptions";
import Pagination from "../../interactive_components/Pagination/Pagination";
import RecipeFilterPopover from "./RecipeFilterPopover";

type Props = {
    pagenumber: number
    lastPageIndex: number

    urlBasepath: string
    currentSort: string
    recipesAndAuthors: RecipeAndAuthor[]

    allCategories: Category[]

    user: UserDB | null
}


export default function RecipesSearch({ pagenumber, lastPageIndex, urlBasepath, currentSort, recipesAndAuthors, user, allCategories }: Props) {
    const currentCategory = 'dessert'
    // if (!recipes || recipes.length === 0)
    //   return (
    //     <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
    //       <p className="text-3xl text-center text-gray-700">
    //         Can not find any recipes, sorry (:
    //       </p>
    //     </div>
    //   );

    return (
        <>
            <div className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-14">
                <div className="flex flex-col w-full mb-2 lg:justify-between lg:flex-row">
                    <div className="flex items-center group lg:max-w-xl mb-3">
                        <a href="/" aria-label="Item" className="mr-3">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-50">
                                <Image src={'/ingredients.png'} alt={''} width={40} height={40}/>
                            </div>
                        </a>
                        <h2 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl">
                            <span className="inline-block mb-2">Recipes</span>
                            <div
                                className="h-1 ml-auto duration-300 origin-left transform bg-teal-600 scale-x-30 group-hover:scale-x-100"/>
                        </h2>
                    </div>
                    <p className="w-full text-gray-600 lg:text-sm lg:max-w-md mb-5">
                        "Cooking is not difficult. Everyone has a taste, even if they don’t
                        realize it. Even if you’re not a great chef, there’s nothing to stop
                        you from understanding the difference between what tastes good and
                        what doesn’t."
                    </p>
                </div>
                <div className='flex flex-row w-full -ml-4 lg:ml-1 mb-2 justify-between'>
                    <div><RecipeFilterPopover allCategories={allCategories} currentSort={currentSort} /></div>
                    <div><DropdownComponent optionNames={allSortOptions} currentSort={currentSort} currentCategory={currentCategory} /></div>
                </div>

                <RecipeCard recipesAndAuthors={recipesAndAuthors} quickview={true} user={user}/>

                <div className='float-right pt-4'>
                    {/* todo: FIX URL WITH FUNCTION UTILS */}
                    <Pagination urlpathTo={`${urlBasepath}ordering=${currentSort}&pagenumber=`} currentPage={pagenumber} lastPage={lastPageIndex}/>
                </div>

            </div>
        </>
    );
}
