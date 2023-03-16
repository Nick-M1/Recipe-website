import {db} from "../../../firebase";
import {collection, doc, getDoc, getDocs, limit, orderBy, query, startAt, where} from "@firebase/firestore";

async function getWithCategory(sortQuery: SortOptionsRecipeAndAuthor, paginationEnd: number, categoryQuery: Category) {
    return await getDocs(
        query(
            collection(db, "recipes"),
            where("categories", "array-contains", categoryQuery),
            orderBy(sortQuery.query, sortQuery.order),
            limit(paginationEnd),
        )
    )
}
async function getWithoutCategory(sortQuery: SortOptionsRecipeAndAuthor, paginationEnd: number) {
    return await getDocs(
        query(
            collection(db, "recipes"),
            orderBy(sortQuery.query, sortQuery.order),
            limit(paginationEnd),
        )
    )
}

// Only works on server
export default async function getAllRecipesAndAuthorsByCategory(
    categoryQuery: Category | undefined,
    sortQuery: SortOptionsRecipeAndAuthor,
    paginationStart: number,
    paginationEnd: number

): Promise<RecipeAndAuthor[]> {

    const recipes = [] as Recipe[]
    const recipesAndAuthors = [] as RecipeAndAuthor[]

    const recipesSnapshot = typeof categoryQuery == 'undefined'
        ? await getWithoutCategory(sortQuery, paginationEnd)
        : await getWithCategory(sortQuery, paginationEnd, categoryQuery)

    let counter = 0
    recipesSnapshot.forEach((doc) => {
        if (counter >= paginationStart)
            recipes.push(doc.data() as Recipe)

        counter += 1
    });

    // Foreach recipe, get its author
    for (const recipe of recipes) {
        const userSnap = await getDoc(
            doc(db, "users", recipe.author)
        );
        recipesAndAuthors.push({
            recipe: recipe,
            author: userSnap.data() as UserDB
        })
    }

    return recipesAndAuthors
}
