import {getServerSession} from "next-auth";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";
import getUserByEmail from "../../../lib/DB/server/getUserByEmail";
import getAllRecipesByUser from "../../../lib/DB/server/getAllRecipesByUser";
import SigninRedirecting from "../../../components/accounts/SigninRedirecting";
import SavedRecipes from "../../../components/dashboard/SavedRecipes";
import getRecipeAuthorById from "../../../lib/DB/server/getRecipeAuthorById";
import {arrayRemove, arrayUnion, doc, updateDoc} from "@firebase/firestore";
import {db} from "../../../firebase";
import getBookmarkedRecipesByUser from "../../../lib/DB/server/getBookmarkedRecipesByUser";


export default async function Page() {
    const sessionAuth = await getServerSession(authOptions)
    if (sessionAuth == null) return <SigninRedirecting/>

    const user = sessionAuth.user != null ? await getUserByEmail(sessionAuth.user.email!) : null
    if (user == null) throw new Error("User can't be found in DB")

    const bookmarkedRecipes = await getBookmarkedRecipesByUser(user)

    return (
        <div>
            <SavedRecipes recipesAndAuthors={bookmarkedRecipes} user={user}/>
        </div>
    );
}