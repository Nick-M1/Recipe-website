type Recipe = {
    id: string
    author: string
    categories: Category[]

    title: string
    cookTime: number        // in mins
    description: string

    ingredients: Ingredient[]
    method: MethodItem[]

    imgSrc: string
    imgAlt: string

    numberOfLikes: number
    numberOfBookmarks: number

    created_at: number
    edited_at: number
}


type Category = {
    id: number
    href: string
    title: string
    description: string
    img: string
}

type Ingredient = {
    text: string
    img: string
}

type MethodItem = {
    title: string
    description: string
    imgs: string[]
}

type UserDB = {
    email: string
    name: string
    pic: string
    likedRecipes: string[]
    bookmarkedRecipes: string[]
}

type RecipeAndAuthor = {
    recipe: Recipe
    author: UserDB
}

type SortOptionsRecipeAndAuthor = {
    name: string
    query: string
    order: 'asc' | 'desc'
}

