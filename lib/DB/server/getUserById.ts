// Only works on server
import {collection, getDocs, query, where} from "@firebase/firestore";
import {db} from "../../../firebase";

export default async function getUserById(userId: string): Promise<UserDB | null> {
    let user: UserDB | null = null

    // Get all recipes
    const recipesSnapshot = await getDocs(query(collection(db, "users"), where('id', '==', userId)));
    recipesSnapshot.forEach((doc) => user = doc.data() as UserDB)

    return user
}