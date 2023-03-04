import React from 'react';
import RecipesSearch from "../../../components/recipe/search/RecipesSearch";
import getUserByEmail from "../../../lib/DB/server/getUserByEmail";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";
import {Metadata} from "next";
import {allSortOptions} from "../../../lib/DB/both/allRecipeSortOptions";
import getCategories from "../../../lib/DB/both/getCategories";
import getAllRecipesAndAuthorsByCategory from "../../../lib/DB/server/getRecipesAndAuthorsByCategory";
import getAllRecipesAndAuthorsByQuery from "../../../lib/DB/server/getRecipesAndAuthorsBySearchtext";

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
    title: 'Search'
}

type PageProp = {
    searchParams: {
        query: string
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

    // Get page number
    const pagenumber = Object.hasOwn(searchParams, 'pagenumber') && searchParams.pagenumber > 0
        ? Number(searchParams.pagenumber)
        : 1

    // Get sort ordering by
    let sortQuery = Object.hasOwn(searchParams, 'ordering')
        ? allSortOptions.find( o => o.query == searchParams.ordering )
        : allSortOptions[0]
    if (typeof sortQuery == 'undefined')
        sortQuery = allSortOptions[0]


    // QUERY BY SEARCH-TEXT:
    const queryBySearchtext = async () => {
        return  getAllRecipesAndAuthorsByQuery(
            searchParams.query.toLowerCase(),
            sortQuery!,                             // !!!
            (pagenumber - 1) * NUM_ITEMS_PER_PAGE,
            (pagenumber - 1) * NUM_ITEMS_PER_PAGE + NUM_ITEMS_PER_PAGE
        )
    }


    // QUERY BY CATEGORY:
    const queryByCategory = async () => {
        const categoryQuery = Object.hasOwn(searchParams, 'category')
            ? allCategories.find(o => o.href == searchParams.category)
            : undefined

        return getAllRecipesAndAuthorsByCategory(
            categoryQuery,
            sortQuery!,
            (pagenumber - 1) * NUM_ITEMS_PER_PAGE,
            (pagenumber - 1) * NUM_ITEMS_PER_PAGE + NUM_ITEMS_PER_PAGE
        )
    }

    // Running query, based on params in URL
    const recipesAndAuthors = Object.hasOwn(searchParams, 'query')
        ? await queryBySearchtext()
        : await queryByCategory()

    //todo: put this line into searchUrlBuilder() function in utils
    const currentUrlWithoutSort = `${PAGE_BASEPATH}${Object.hasOwn(searchParams, 'category') ? 'category=' + searchParams.category : (Object.hasOwn(searchParams, 'query') ? 'query=' + searchParams.query : 'query=') }&ordering=`

    return (
        <div>
            <RecipesSearch
                urlBasepath={PAGE_BASEPATH}
                currentUrlWithoutSort={currentUrlWithoutSort}

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