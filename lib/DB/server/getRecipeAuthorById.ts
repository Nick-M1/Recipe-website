import {db} from "../../../firebase";
import {collection, doc, getDoc, getDocs} from "@firebase/firestore";


// Only works on server
export default async function getRecipeAuthorById(recipeId: string): Promise<RecipeAndAuthor | null> {
    const recipesSnap = await getDoc(
        doc(db, "recipes", recipeId)
    );

    if (!recipesSnap.exists())
        return null

    const recipesData = recipesSnap.data() as Recipe

    const userSnap = await getDoc(
        doc(db, "users", recipesData.author)
    );

    if (!userSnap.exists())
        return null

    return {
        recipe: recipesData,
        author: userSnap.data() as UserDB
    }
}