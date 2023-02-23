import {db} from "../../../firebase";
import {collection, doc, getDoc, getDocs} from "@firebase/firestore";

// Only works on server
export default async function getUserByEmail(userEmail: string): Promise<UserDB | null> {
    const docSnap = await getDoc(
        doc(db, "users", userEmail)
    );

    if (docSnap.exists())
        return docSnap.data() as UserDB

    return null
}