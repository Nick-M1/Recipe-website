import {db} from "../../../firebase";
import {collection, doc, getDoc, getDocs} from "@firebase/firestore";


// Only works on server
export default async function getRecipeById(recipeId: string): Promise<Recipe | null> {
    const recipesSnap = await getDoc(
        doc(db, "recipes", recipeId)
    );

    if (!recipesSnap.exists())
        return null

    return recipesSnap.data() as Recipe
}