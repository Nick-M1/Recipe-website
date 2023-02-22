export function getRecipes(): Recipe[] {
    return [
        {
            id: 1,
            author: 'James',
            categories: [getCategories()[0]],

            title: 'Title',
            description: 'how to make...',
            cookTime: 50,

            ingredients: ['carrot', 'milk'],
            procedure: ['add carrot', 'add milk'],

            imgSrc: 'url...',
            imgAlt: 'url...',

            numberOfLikes: 10,
            numberOfBookmarks: 26
        }
    ]
}

export function getCategories(): Category[] {
    return [
        {
            id: 1,
            title: "Appetizer",
            description: "While eating your appetizer, don't be concerned with dessert. ",
            numOfRecipes: 20,
        },
        {
            id: 2,
            title: "Dessert",
            description: "You can’t buy happiness, but you can buy dessert :) same thing.",
            numOfRecipes: 20,
        },
        {
            id: 3,
            title: "Main Dish",
            description: "I am not an encore, not a pudding, I am the main dish.",
            numOfRecipes: 20,
        },
    ]
}