import {db} from "../../../firebase";
import {collection, doc, getDoc, getDocs, limit, orderBy, query, startAt} from "@firebase/firestore";

// Only works on server
export default async function getAllRecipesAndAuthorsByQuery(
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

            limit(paginationEnd)
        )
    );

    let counter = 0
    recipesSnapshot.forEach((doc) => {
        if (counter >= paginationStart)
            recipes.push(<Recipe>doc.data())

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
