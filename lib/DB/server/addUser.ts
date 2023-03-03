// Only works on server
import {doc, getDoc, setDoc} from "@firebase/firestore";
import {db} from "../../../firebase";
import {User} from "next-auth";
import {uuidv4} from "@firebase/util";

export default async function addUser(user: User) {
    await setDoc(
        doc(db, 'users', user.email!),
        {
            id: uuidv4(),
            name: user.name!,
            email: user.email!,
            pic: user.image != null ? user.image : "https://res.cloudinary.com/dmtc1wlgq/image/upload/v1641911896/media/avatar/default_zrdbiq.png",
            biography: '',
            likedRecipes: [],
            bookmarkedRecipes: []
        } as UserDB
    )
}