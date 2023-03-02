import {db} from "../../../firebase";
import {collection, doc, getDoc, getDocs, limit, orderBy, query, startAt, where} from "@firebase/firestore";
import {allSortOptions} from "../../utils/allRecipeSortOptions";

// Only works on server
export default async function getAllRecipesAndAuthorsByQuery(
    categoryQuery: Category | undefined,
    sortQuery: SortOptionsRecipeAndAuthor,
    paginationStart: number,
    paginationEnd: number

): Promise<RecipeAndAuthor[]> {

    const recipes = [] as Recipe[]
    const recipesAndAuthors = [] as RecipeAndAuthor[]

    // Get all recipes
    const recipesSnapshot = await getDocs(
        query(
            collection(db, "recipes"),
            orderBy(sortQuery.query, sortQuery.order),
            limit(paginationEnd),
        )
    );

    const categoryFilterCheck = typeof categoryQuery == 'undefined'
    let counter = 0
    recipesSnapshot.forEach((doc) => {
        const docData = doc.data() as Recipe

        if (counter >= paginationStart && (categoryFilterCheck || docData.categories.findIndex(c => c.id == categoryQuery.id) != -1))
            recipes.push(docData)

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
