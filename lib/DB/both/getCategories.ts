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
        {
            id: 4,
            href: 'breakfast',
            title: "Breakfast",
            description: "The most important meal of the day.",
            img: '/categories/Breakfast.png',
        },
        {
            id: 5,
            href: 'drink',
            title: "Drink",
            description: "Keep hydrated throughout the day.",
            img: '/categories/Drink.png',
        },
        {
            id: 6,
            href: 'cocktail',
            title: "Cocktail",
            description: "To me 'Drink reasonably' means don't spill it.",
            img: '/categories/Cocktail.png',
        },
    ]
}