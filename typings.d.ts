type Recipe = {
    id: string
    author: string
    categories: Category[]
    labels: string[]

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
    comments: CommentItem[]
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
    id: string
    email: string
    name: string
    pic: string
    biography: string
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

type CommentItem = {
    authorEmail: string
    authorName: string
    authorPic: string
    rating: number
    comment: string,
    created_at: number,
}

