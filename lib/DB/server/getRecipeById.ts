import {db} from "../../../firebase";
import {collection, doc, getDoc, getDocs} from "@firebase/firestore";

// Only works on server
export default async function getRecipeById(recipeId: string): Promise<Recipe | null> {
    const docSnap = await getDoc(
        doc(db, "recipes", recipeId)
    );

    if (docSnap.exists())
        return docSnap.data() as Recipe

    return null
}