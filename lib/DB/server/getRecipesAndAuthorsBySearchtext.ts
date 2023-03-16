import {db} from "../../../firebase";
import {collection, doc, getDoc, getDocs, limit, orderBy, query, startAt, where} from "@firebase/firestore";

// NOTE: Firebase doesn't support 'OR' queries, so need to do all text queries in JS :(

// Only works on server
export default async function getAllRecipesAndAuthorsByQuery(
    searchQuery: string | undefined,
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

    const searchFilterCheck = typeof searchQuery == 'undefined'
    let counter = 0
    recipesSnapshot.forEach((doc) => {
        const docData = doc.data() as Recipe

        if (counter >= paginationStart
            && (searchFilterCheck
                || docData.title.toLowerCase().includes(searchQuery)
                || docData.description.toLowerCase().includes(searchQuery)
                || docData.categories[0].title.toLowerCase().includes(searchQuery)
                || docData.labels.includes(searchQuery))
        )
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
