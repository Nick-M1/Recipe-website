'use client'
import CategorySelector from "./CategorySelector";
import IngredientsSelector from "./IngredientsSelector";
import MethodSelector from "./MethodSelector";
import TimePicker from "./TimePicker";
import PictureUpload from "./PictureUpload";
import {FormEvent, useEffect, useState} from "react";
import {Session} from "next-auth";
import {signIn} from "next-auth/react";
import {checkImage} from "../../../lib/utils/urlUtils";
import {any, instanceOf} from "prop-types";
import {useRouter} from "next/navigation";

type Props = {
    sessionAuth: Session | null
    buttonLabel: string
    editMode: boolean
    allCategories: Category[]
    recipe?: Recipe
}

export default function RecipeForm({ sessionAuth, buttonLabel, editMode, allCategories, recipe }: Props) {
    if (sessionAuth == null) {
        signIn()
        return <div className='text-center p-20'>Redirecting to sign in</div>
    }

    if (editMode && recipe == null)
        throw new Error('Incorrect params for "RecipeForm"')

    const [selectedTitle, setSelectedTitle] = useState(editMode ? recipe!.title : '')
    const [selectedDescription, setSelectedDescription] = useState(editMode ? recipe!.description : '')

    const [selectedCategory, setSelectedCategory] = useState<Category>(editMode ? recipe!.categories[0] : allCategories[0])
    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(editMode ? recipe!.ingredients : [])
    const [selectedMethod, setSelectedMethod] = useState<MethodItem[]>(editMode ? recipe!.method : [])

    const [selectedCookTime, setSelectedCookTime] = useState(editMode ? recipe!.cookTime : 30)
    const [selectedPicture, setSelectedPicture] = useState("")

    const allFields = [ selectedTitle, selectedDescription, selectedCategory, selectedIngredients, selectedMethod, selectedCookTime, selectedPicture ]
    const [incorrectFields, setIncorrectFields] = useState<boolean[]>([true, true, true, true, true, true, true])

    const router = useRouter();

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const checkedFields = allFields.map(elem => {
            if ( typeof elem == 'number')
                return true
            if ( typeof elem == 'string')
                return elem != ''
            if ( Array.isArray(elem) )
                return elem.length != 0

            return true                        //todo make category into list
        })

        setIncorrectFields( checkedFields )

        if (!(await checkImage(selectedPicture)) || checkedFields.some(field => !field))          //todo: check all & popup
            return

        const newRecipe = {
            id: '0',
            author: sessionAuth.user?.email,
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

        if (data.body == 'method not allowed')
            return          //todo tell user there is an error

        router.push(`/recipe/${data.body}`)
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
                                        <h1 className={`text-lg leading-6 font-medium ${incorrectFields[0] || selectedTitle != '' ? 'text-gray-900' : 'text-red-700 dark:text-red-500' }`}>
                                            Title
                                        </h1>
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            className={`p-2.5 mt-1 block w-full input-secondary ${incorrectFields[0] || selectedTitle != '' ? '' : 'input-secondary-invalid' }`}
                                            placeholder="Write a title for your recipe..."
                                            defaultValue={
                                                editMode && recipe != null ? recipe.title : undefined
                                            }
                                            onChange={(e) => setSelectedTitle(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <h1 className={`text-lg leading-6 font-medium ${incorrectFields[1] || selectedDescription != '' ? 'text-gray-900' : 'text-red-700 dark:text-red-500' }`}>
                                            Description
                                        </h1>
                                        <div className="mt-1">
                                            <textarea
                                                id="desc"
                                                name="desc"
                                                rows={3}
                                                className={`p-2.5 mt-1 block w-full input-secondary ${incorrectFields[1] || selectedDescription != '' ? '' : 'input-secondary-invalid' }`}
                                                placeholder="Write a short description..."
                                                defaultValue={
                                                    editMode && recipe != null ? recipe.description : undefined
                                                }
                                                onChange={(e) => setSelectedDescription(e.target.value)}
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Write a short and precise description about your recipe.
                                        </p>
                                    </div>
                                    <CategorySelector allCategories={allCategories} selectedCategory={selectedCategory}
                                                      setSelectedCategory={setSelectedCategory}
                                                      isValid={incorrectFields[2]}
                                    />
                                    <IngredientsSelector selectedIngredients={selectedIngredients}
                                                         setSelectedIngredients={setSelectedIngredients}
                                                         isValid={incorrectFields[3]}
                                    />
                                    <MethodSelector selectedMethod={selectedMethod}
                                                    setSelectedMethod={setSelectedMethod}
                                                    isValid={incorrectFields[4]}
                                    />
                                    <TimePicker selectedCookTime={selectedCookTime}
                                                setSelectedCookTime={setSelectedCookTime}
                                    />
                                    <PictureUpload selectedPicture={selectedPicture}
                                                   setSelectedPicture={setSelectedPicture}
                                                   isValid={incorrectFields[6]}
                                    />
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className={`w-full btn-secondary py-3 px-8 flex items-center justify-center text-base font-medium ${sessionAuth == null ? 'cursor-not-allowed' : ''}`}
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
