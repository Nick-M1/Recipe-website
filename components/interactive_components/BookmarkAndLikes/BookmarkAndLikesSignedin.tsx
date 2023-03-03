'use client'

import {useEffect, useState} from "react";
import {arrayRemove, arrayUnion, doc, increment, onSnapshot, updateDoc} from "@firebase/firestore";
import {db} from "../../../firebase";
import {ClockIcon} from "@heroicons/react/24/outline";
import Image from "next/image";

type Props = {
    recipe: Recipe
    user: UserDB
    showText: boolean
}

function containsRecipe( recipeList: string[], recipeId: string ) {
    return recipeList.findIndex( elem => elem === recipeId ) != -1
}

export default function BookmarkAndLikesSignedin({ recipe, user, showText }: Props) {
    const [isBookmarked, setIsBookmarked] = useState( containsRecipe(user.bookmarkedRecipes, recipe.id) )
    const [isLiked, setIsLiked] = useState( containsRecipe(user.likedRecipes, recipe.id) )

    const unsub = onSnapshot(
        doc(db, "users", user.email),
        (doc) => {
            const userSnapshot = doc.data() as UserDB
            setIsLiked( containsRecipe(userSnapshot.likedRecipes, recipe.id) )
            setIsBookmarked( containsRecipe(userSnapshot.bookmarkedRecipes, recipe.id) )
        }
    );
    useEffect(() => {return () => unsub()})


    const updateLikes = async () => {
        await updateDoc(
            doc(db, "recipes", recipe.id),
            {
                numberOfLikes: increment(isLiked ? -1 : 1)
            }
        );
        setIsLiked(prevState => !prevState)

        await updateDoc(
            doc(db, "users", user.email),
            {
                likedRecipes: isLiked ? arrayRemove(recipe.id) : arrayUnion(recipe.id),
            }
        );
    }

    const updateBookmarks = async () => {
        await updateDoc(
            doc(db, "recipes", recipe.id),
            {
                numberOfBookmarks: increment(isBookmarked ? -1 : 1)
            }
        );
        setIsBookmarked(prevState => !prevState)

        await updateDoc(
            doc(db, "users", user.email),
            {
                bookmarkedRecipes: isBookmarked ? arrayRemove(recipe.id) : arrayUnion(recipe.id)
            }
        );
    }

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
                onClick={() => updateBookmarks()}
            >
                <Image src={'/animations/bookmark.png'} alt={''} width={30} height={30} className={`hidden md:block md:group-hover:hidden ${isBookmarked ? 'md:hidden' : 'grayscale'}`}/>
                <Image src={'/animations/bookmark.gif'} alt={''} width={30} height={30} className={`group-hover:block group-active:scale-150 group-active:-translate-y-3 smooth-transition ${isBookmarked ? 'md:block' : 'md:hidden grayscale'}`}/>

                <p className={`hidden ml-1 ${showText ? 'md:group-hover:block' : ''}`}> Save </p>
                <span className="ml-2 tabular-nums">
                  {isBookmarked ? recipe.numberOfBookmarks + 1 : recipe.numberOfBookmarks}
                </span>
            </button>
            <button
                type="button"
                className="group py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                onClick={() => updateLikes()}
            >
                <Image src={'/animations/heart-like.png'} alt={''} width={30} height={30} className={`hidden md:block md:group-hover:hidden ${isLiked ? 'md:hidden' : 'grayscale'}`}/>
                <Image src={'/animations/heart-like.gif'} alt={''} width={30} height={30} className={`group-hover:block group-active:scale-150 group-active:-translate-y-3 smooth-transition ${isLiked ? 'md:block' : 'md:hidden grayscale'}`}/>
                <p className={`hidden ml-1 ${showText ? 'md:group-hover:block' : ''}`}> Like </p>
                <span className="ml-2 tabular-nums">
                    { isLiked ? recipe.numberOfLikes + 1 : recipe.numberOfLikes }
                </span>
            </button>

        </div>
    );
}