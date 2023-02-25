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
}


type Category = {
    id: number
    title: string
    description: string
    numOfRecipes: number
    // img: string
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
    // name: string
    // profileImg: string
    likedRecipes: string[]
    bookmarkedRecipes: string[]
}