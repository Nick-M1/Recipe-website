import getCategories from "./getCategories";
import {db} from "../../../firebase";
import {collection, doc, getDoc, getDocs} from "@firebase/firestore";

// Only works on server
// export default async function getAllRecipes(): Promise<Recipe[]> {
//     const recipes = [] as Recipe[]
//
//     const querySnapshot = await getDocs(collection(db, "recipes"));
//     querySnapshot.forEach((doc) => recipes.push(<Recipe> doc.data()));
//
//     return recipes
// }



export default async function getAllRecipes(): Promise<RecipeAndAuthor[]> {
    const recipes = [] as Recipe[]
    const recipesAndAuthors = [] as RecipeAndAuthor[]

    // Get all recipes
    const recipesSnapshot = await getDocs(collection(db, "recipes"));
    recipesSnapshot.forEach((doc) => recipes.push(<Recipe> doc.data()));

    // Foreach recipe, get its author
    for (const recipe of recipes) {
        const userSnap = await getDoc(
            doc(db, "users", recipe.author)
        );
        recipesAndAuthors.push({
            recipe: recipe,
            author: userSnap.data() as UserDB
        })
    }

    return recipesAndAuthors
}

// function getAllRecipes_Mock(): Recipe[] {
//     return [
//         {
//             id: '1',
//             author: 'James',
//             categories: [getCategories()[0]],
//
//             title: 'Cheeseburger',
//             description: 'how to make **cheese** burger',
//             cookTime: 50,
//
//             ingredients: [
//                 { text: '100g of Bread', img: 'https://img.icons8.com/dusk/64/null/bread.png' },
//                 { text: '200g of Cheese', img: 'https://img.icons8.com/dusk/64/null/cheese.png' },
//                 { text: '50g of Almond butter', img: 'https://img.icons8.com/dusk/64/null/almond-butter.png' },
//             ],
//             method: [
//                 { title: 'Add carrot', description: '**Add** carrot to pan',
//                     imgs: [
//                         'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Sautee_onions_and_peppers.jpg/330px-Sautee_onions_and_peppers.jpg',
//                         'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/BBQ_Food.jpg/330px-BBQ_Food.jpg',
//                         'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Chef_Tom_Wandera_at_work.jpg/330px-Chef_Tom_Wandera_at_work.jpg',
//                     ]
//                 },
//                 { title: 'Add milk', description: 'Add milk to pan', imgs: [] },
//             ],
//
//             imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Cheeseburger_with_fries.jpg/450px-Cheeseburger_with_fries.jpg',
//             imgAlt: 'cheeseburger img',
//
//             numberOfLikes: 10,
//             numberOfBookmarks: 26
//         }
//     ]
// }