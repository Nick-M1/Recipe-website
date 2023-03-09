import {useState} from "react";
import QuickView from "../QuickView";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import BookmarkAndLikesHander from "../../../interactive_components/BookmarkAndLikes/BookmarkAndLikesHander";
import RecipeCard from "./RecipeCard";

type Props = {
    recipesAndAuthors: RecipeAndAuthor[]
    flexGrid: boolean
    quickview: boolean
    user: UserDB | null
}

export default function RecipeCardGrid({recipesAndAuthors, flexGrid, quickview, user}: Props) {
    return (
        <div className={`grid grid-cols-1 gap-5 ${flexGrid ? 'sm:grid-cols-2 lg:grid-cols-3' : ''}`}>
            <RecipeCard recipesAndAuthors={recipesAndAuthors} quickview={quickview} user={user}/>
        </div>
    )
}
