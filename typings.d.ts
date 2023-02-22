type Recipe = {
    id: number
    author: string
    categories: Category[]

    title: string
    cookTime: number
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
    name: string
    amount: string
    img: string
}

type MethodItem = {
    title: string
    description: string
    imgs: string[]
}