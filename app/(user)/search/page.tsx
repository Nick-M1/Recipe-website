import React from 'react';
import RecipesSearch from "../../../components/recipe/search/RecipesSearch";
import getAllRecipesAndAuthors from "../../../lib/DB/server/getAllRecipesAndAuthors";
import getUserByEmail from "../../../lib/DB/server/getUserByEmail";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";
import {Metadata} from "next";
import {allSortOptions} from "../../../lib/utils/allRecipeSortOptions";
import getAllRecipesAndAuthorsByQuery from "../../../lib/DB/server/getRecipesAndAuthorsByQuery";

export const metadata: Metadata = {
    title: 'Search'
}

export const dynamic = 'force-dynamic'

type PageProp = {
    searchParams: {
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

    const sortQuery = Object.hasOwn(searchParams, 'ordering')
        ? allSortOptions.find( o => o.query == searchParams.ordering )
        : undefined

    const pagenumber = Object.hasOwn(searchParams, 'pagenumber') && searchParams.pagenumber > 0
        ? Number(searchParams.pagenumber)
        : 1

    const recipesAndAuthors = typeof sortQuery == 'undefined'
        ? await getAllRecipesAndAuthors()
        : await getAllRecipesAndAuthorsByQuery(sortQuery, (pagenumber - 1) * NUM_ITEMS_PER_PAGE, (pagenumber - 1) * NUM_ITEMS_PER_PAGE + NUM_ITEMS_PER_PAGE)

    return (
        <div>
            <RecipesSearch
                pagenumber={pagenumber}
                lastPageIndex={LAST_PAGE_INDEX}
                recipesAndAuthors={recipesAndAuthors}
                user={user}
                urlBasepath={PAGE_BASEPATH}
                currentSort={ typeof sortQuery == 'undefined' ? '' : sortQuery.query }
            />
        </div>
    );
}