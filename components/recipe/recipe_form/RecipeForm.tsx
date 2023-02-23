'use client'
import CategorySelector from "./CategorySelector";
import IngredientsSelector from "./IngredientsSelector";
import MethodSelector from "./MethodSelector";
import TimePicker from "./TimePicker";
import PictureUpload from "./PictureUpload";
import {FormEvent, useEffect, useState} from "react";
import {randomUUID} from "crypto";

type Props = {
    buttonLabel: string
    editMode: boolean
    allCategories: Category[]
    recipe?: Recipe
}

export default function RecipeForm({buttonLabel, editMode, allCategories, recipe}: Props) {
    if (editMode && recipe == null)
        throw new Error('Incorrect params for "RecipeForm"')


    const [selectedTitle, setSelectedTitle] = useState(editMode ? recipe!.title : '')
    const [selectedDescription, setSelectedDescription] = useState(editMode ? recipe!.description : '')

    const [selectedCategory, setSelectedCategory] = useState<Category>(editMode ? recipe!.categories[0] : allCategories[0])
    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(editMode ? recipe!.ingredients : [])
    const [selectedMethod, setSelectedMethod] = useState<MethodItem[]>(editMode ? recipe!.method : [])

    const [selectedCookTime, setSelectedCookTime] = useState(editMode ? recipe!.cookTime : 30)
    const [selectedPicture, setSelectedPicture] = useState("")


    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // if (selectedTitle == '' || selectedDescription == '' || selectedIngredients.length == 0 || selectedMethod.length == 0 || selectedCookTime == 0 || selectedPicture == '')          //todo: check all & popup
        //     return

        const newRecipe = {
            id: '0',
            author: 'test-email',
            categories: [selectedCategory],       //todo: select multiple categories

            title: selectedTitle,
            cookTime: selectedCookTime,
            description: selectedDescription,

            ingredients: selectedIngredients,
            method: selectedMethod,

            imgSrc: selectedPicture,
            imgAlt: 'img of food',

            numberOfLikes: 0,
            numberOfBookmarks: 0,
        } as Recipe

        const res = await fetch('/api/addRecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newRecipe
            })
        })
        const data = await res.json()
    };

    return (
        <>
            <div>
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="p-5 text-lg font-medium leading-6 text-gray-900">
                                Create your recipe and share it to the world!
                            </h3>
                            <p className="px-5 text-sm text-gray-600">
                                "Cooking is like painting or writing a song. Just as there are
                                only so many notes or colors, there are only so many
                                flavors—it’s how you combine them that sets you apart."
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleFormSubmit}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div>
                                        <h1 className="text-lg leading-6 font-medium text-gray-900">
                                            Title
                                        </h1>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md"
                                            placeholder="Write a title for your recipe. Something catchy ..."
                                            defaultValue={
                                                editMode && recipe != null ? recipe.title : undefined
                                            }
                                            onChange={(e) => setSelectedTitle(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <h1 className="text-lg leading-6 font-medium text-gray-900">
                                            Description
                                        </h1>
                                        <div className="mt-1">
                                            <textarea
                                                id="desc"
                                                name="desc"
                                                rows={3}
                                                className="shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                placeholder="Write a short description..."
                                                defaultValue={
                                                    editMode && recipe != null ? recipe.description : undefined
                                                }
                                                onChange={(e) => setSelectedDescription(e.target.value)}
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Write a short and precise description abour your recipe.
                                        </p>
                                    </div>
                                    <CategorySelector allCategories={allCategories} selectedCategory={selectedCategory}
                                                      setSelectedCategory={setSelectedCategory}/>
                                    <IngredientsSelector selectedIngredients={selectedIngredients}
                                                         setSelectedIngredients={setSelectedIngredients}/>
                                    <MethodSelector selectedMethod={selectedMethod}
                                                    setSelectedMethod={setSelectedMethod}/>
                                    <TimePicker selectedCookTime={selectedCookTime}
                                                setSelectedCookTime={setSelectedCookTime}/>
                                    <PictureUpload selectedPicture={selectedPicture}
                                                   setSelectedPicture={setSelectedPicture}/>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="w-full bg-teal-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cyan-500"
                                    >
                                        {buttonLabel}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
