import getCategories from "./getCategories";

export default function getRecipes(): Recipe[] {
    return [
        {
            id: 1,
            author: 'James',
            categories: [getCategories()[0]],

            title: 'Cheeseburger',
            description: 'how to make **cheese** burger',
            cookTime: 50,

            ingredients: [
                { name: 'Bread', amount: '100g', img: 'https://img.icons8.com/dusk/64/null/bread.png' },
                { name: 'Cheese', amount: '200g', img: 'https://img.icons8.com/dusk/64/null/cheese.png' },
                { name: 'Almond butter', amount: '50g', img: 'https://img.icons8.com/dusk/64/null/almond-butter.png' },
            ],
            method: [
                { title: 'Add carrot', description: '**Add** carrot to pan',
                    imgs: [
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Sautee_onions_and_peppers.jpg/330px-Sautee_onions_and_peppers.jpg',
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/BBQ_Food.jpg/330px-BBQ_Food.jpg',
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Chef_Tom_Wandera_at_work.jpg/330px-Chef_Tom_Wandera_at_work.jpg',
                    ]
                },
                { title: 'Add milk', description: 'Add milk to pan', imgs: [] },
            ],

            imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Cheeseburger_with_fries.jpg/450px-Cheeseburger_with_fries.jpg',
            imgAlt: 'cheeseburger img',

            numberOfLikes: 10,
            numberOfBookmarks: 26
        }
    ]
}