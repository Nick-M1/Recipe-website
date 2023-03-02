import getCategories from "../both/getCategories";
import {db} from "../../../firebase";
import {collection, doc, getDoc, getDocs, query, where} from "@firebase/firestore";

// Only works on server
export default async function getAllRecipesByUser(userEmail: string): Promise<Recipe[]> {
    const recipes = [] as Recipe[]

    const querySnapshot = await getDocs(
        query(
            collection(db, "recipes"),
            where('author', '==', userEmail)
        )
    )

    querySnapshot.forEach((doc) => recipes.push(<Recipe> doc.data()));
    return recipes
}