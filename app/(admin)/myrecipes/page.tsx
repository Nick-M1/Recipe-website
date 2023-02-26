import MyRecipes from "../../../components/dashboard/MyRecipes";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";
import getUserByEmail from "../../../lib/DB/server/getUserByEmail";
import getAllRecipesByUser from "../../../lib/DB/server/getAllRecipesByUser";
import SigninRedirecting from "../../../components/accounts/SigninRedirecting";


export default async function Page() {
    const sessionAuth = await getServerSession(authOptions)

    if (sessionAuth == null)
        return <SigninRedirecting/>

    const user = sessionAuth.user != null ? await getUserByEmail(sessionAuth.user.email!) : null

    const recipes = await getAllRecipesByUser(user?.email!)
    const recipesAndAuthors: RecipeAndAuthor[] = recipes.map(recipe => {
        return {recipe, author: user!}
    })

    return (
        <div>
            <MyRecipes recipesAndAuthors={recipesAndAuthors} user={user}/>
        </div>
    );
}