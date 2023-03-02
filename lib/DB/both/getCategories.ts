export default function getCategories(): Category[] {
    return [
        {
            id: 1,
            href: 'appetizer',
            title: "Appetizer",
            description: "While eating your appetizer, don't be concerned with dessert. ",
            img: '/categories/Appetizer.png',
        },
        {
            id: 2,
            href: 'dessert',
            title: "Dessert",
            description: "You can’t buy happiness, but you can buy dessert :) same thing.",
            img: '/categories/Dessert.png',
        },
        {
            id: 3,
            href: 'maindish',
            title: "Main Dish",
            description: "I am not an encore, not a pudding, I am the main dish.",
            img: '/categories/Main Dish.png',
        },
    ]
}