import getRecipeAuthorById from "./getRecipeAuthorById";

export default async function getBookmarkedRecipesByUser(user: UserDB, limit: number = Number.MAX_VALUE) {
    const bookmarkedRecipes = [] as RecipeAndAuthor[]


    let counter = 0
    for (const recipeId of user.bookmarkedRecipes) {
        const recipeAndAuthor = await getRecipeAuthorById(recipeId)

        if (recipeAndAuthor != null && counter < limit)
            bookmarkedRecipes.push(recipeAndAuthor)

        counter += 1
    }

    return bookmarkedRecipes
}