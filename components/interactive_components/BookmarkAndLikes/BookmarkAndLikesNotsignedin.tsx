'use client'

import {useEffect, useState} from "react";
import {arrayRemove, arrayUnion, doc, increment, onSnapshot, updateDoc} from "@firebase/firestore";
import {db} from "../../../firebase";
import {ClockIcon} from "@heroicons/react/24/outline";
import Image from "next/image";

type Props = {
    recipe: Recipe
    showText: boolean
}

export default function BookmarkAndLikesNotsignedin({ recipe, showText }: Props) {

    return (
        <div className="mt-2 flex sm:flex-col1">
            <div
                className="inline-flex items-center text-teal-600 border px-4 border-transparent bg-teal-50 rounded-md">
                <ClockIcon className="h-8 w-8 text-teal-600 pr-1"/>{" "}
                <span className="font-medium">{recipe.cookTime}</span>
            </div>

            <button
                type="button"
                className="group py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            >
                <Image src={'/animations/bookmark.png'} alt={''} width={30} height={30} className='hidden md:block md:group-hover:hidden grayscale'/>
                <Image src={'/animations/bookmark.gif'} alt={''} width={30} height={30} className='group-hover:block group-active:scale-150 group-active:-translate-y-3 smooth-transition md:hidden grayscale'/>

                <p className={`hidden ml-1 ${showText ? 'group-hover:block' : ''}`}> Save </p>
                <span className="ml-2 tabular-nums">
                  { recipe.numberOfBookmarks }
                </span>
            </button>
            <button
                type="button"
                className="group py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            >
                <Image src={'/animations/heart-like.png'} alt={''} width={30} height={30} className='hidden md:block md:group-hover:hidden grayscale'/>
                <Image src={'/animations/heart-like.gif'} alt={''} width={30} height={30} className='group-hover:block group-active:scale-150 group-active:-translate-y-3 smooth-transition md:hidden grayscale'/>
                <p className={`hidden ml-1 ${showText ? 'group-hover:block' : ''}`}> Like </p>
                <span className="ml-2 tabular-nums">
                    { recipe.numberOfLikes }
                </span>
            </button>

        </div>
    );
}