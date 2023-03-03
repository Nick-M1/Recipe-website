import React from 'react';
import RecipesSearch from "../../../components/recipe/search/RecipesSearch";
import getAllRecipesAndAuthors from "../../../lib/DB/server/getAllRecipesAndAuthors";
import getUserByEmail from "../../../lib/DB/server/getUserByEmail";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";
import {Metadata} from "next";
import {allSortOptions} from "../../../lib/DB/both/allRecipeSortOptions";
import getAllRecipesAndAuthorsByQuery from "../../../lib/DB/server/getRecipesAndAuthorsByQuery";
import getCategories from "../../../lib/DB/both/getCategories";
import getAllRecipes from "../../../lib/DB/server/getAllRecipes";

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
    title: 'Search'
}

type PageProp = {
    searchParams: {
        category: string
        ordering: string
        pagenumber: number
    }
}

const NUM_ITEMS_PER_PAGE = 100
const PAGE_BASEPATH = '/search?'
const LAST_PAGE_INDEX = 11

export default async function Page({ searchParams }: PageProp) {
    const sessionAuth = await getServerSession(authOptions)
    const user = sessionAuth != null && sessionAuth.user != null ? await getUserByEmail(sessionAuth.user.email!) : null

    const allCategories = getCategories()

    const categoryQuery = Object.hasOwn(searchParams, 'category')
        ? allCategories.find( o => o.href == searchParams.category )
        : undefined

    let sortQuery = Object.hasOwn(searchParams, 'ordering')
        ? allSortOptions.find( o => o.query == searchParams.ordering )
        : allSortOptions[0]
    if (typeof sortQuery == 'undefined')
        sortQuery = allSortOptions[0]

    const pagenumber = Object.hasOwn(searchParams, 'pagenumber') && searchParams.pagenumber > 0
        ? Number(searchParams.pagenumber)
        : 1

    const recipesAndAuthors = await getAllRecipesAndAuthorsByQuery(
        categoryQuery,
        sortQuery,
        (pagenumber - 1) * NUM_ITEMS_PER_PAGE,
        (pagenumber - 1) * NUM_ITEMS_PER_PAGE + NUM_ITEMS_PER_PAGE
    )

    return (
        <div>
            <RecipesSearch
                urlBasepath={PAGE_BASEPATH}
                pagenumber={pagenumber}
                lastPageIndex={LAST_PAGE_INDEX}

                recipesAndAuthors={recipesAndAuthors}
                allCategories={allCategories}
                currentSort={sortQuery.query}

                user={user}
            />
        </div>
    );
}