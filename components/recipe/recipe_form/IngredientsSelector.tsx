'use client'
import {useState, createRef, useEffect, SetStateAction, Dispatch} from "react";
import {PlusIcon} from "@heroicons/react/24/solid";

type Props = {
    selectedIngredients: Ingredient[]
    setSelectedIngredients: Dispatch<SetStateAction<Ingredient[]>>
    isValid: boolean
}

export default function IngredientsSelector({ selectedIngredients, setSelectedIngredients, isValid }: Props) {
    const [inputTextValue, setInputTextValue] = useState("");
    const [inputImgValue, setInputImgValue] = useState("");


    const handleAddIngredient = () => {
        if (inputTextValue == '')
            return          //todo - not all fields filled in (disable button)

        if ( selectedIngredients.findIndex( ingredient => ingredient.text === inputTextValue ) != -1 )
            return          //todo - duplicate attempted to be added

        const newIngredient = {
            text: inputTextValue,
            img: inputImgValue
        } as Ingredient

        setSelectedIngredients( prevState => [...prevState, newIngredient] )

        setInputTextValue('')
        setInputImgValue('')
    };

    const handleRemoveIngredient = ( ingredientToRemove: Ingredient ) => {
        setSelectedIngredients( prevState => prevState.filter( ingredient => ingredient.text != ingredientToRemove.text ))
    };

    return (
        <div className='pt-3'>
            <div>
                <h1 className={`text-lg leading-6 font-medium ${ isValid || selectedIngredients.length != 0 ? 'text-gray-900' : 'text-red-700 dark:text-red-500' }`}>
                    Ingredients
                </h1>
                <p className={`mt-1 text-sm ${ isValid || selectedIngredients.length != 0 ? 'text-gray-500' : 'text-red-400 dark:text-red-500' }`}>
                    Add the necessary ingredients for your recipe.
                </p>
            </div>

            <div>
                <main>
                    <section aria-labelledby="filter-heading">
                        {/* Active Ingredients */}
                        <div className="bg-gray-50">
                            <div className="max-w-7xl mx-auto py-2 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 py-1.5">
                                    Ingredients
                                    <span className="sr-only">, active</span>
                                </h3>

                                <div
                                    aria-hidden="true"
                                    className="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4"
                                />

                                <div className="mt-2 sm:mt-0 sm:ml-4">
                                    <div className="-m-1 flex flex-wrap items-center">
                                        { selectedIngredients.map((ingredient, index) => (
                                            <span
                                                key={index}
                                                className="mx-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900"
                                            >
                                            <span>{ingredient.text}</span>
                                            <button
                                                type="button"
                                                className="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500 smooth-transition"
                                                onClick={() => handleRemoveIngredient(ingredient)}
                                            >
                                              <svg
                                                  className="h-2 w-2"
                                                  stroke="currentColor"
                                                  fill="none"
                                                  viewBox="0 0 8 8"
                                              >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeWidth="1.5"
                                                    d="M1 1l6 6m0-6L1 7"
                                                />
                                              </svg>
                                            </button>
                                          </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Ingredients grid */}
                    <section
                        aria-labelledby="products-heading"
                        className="pt-4"
                    >
                        <div
                            className="grid grid-cols-1">
                            <div className="space-y-2">
                                <label
                                    htmlFor="add-ingredients"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Add Ingredients
                                </label>
                                <div className="flex w-full">
                                    <div className="flex-grow md:flex md:gap-x-3">
                                        <input
                                            type="text"
                                            name="add-ingredients-name"
                                            id="add-ingredients-name"
                                            className={`input-secondary block p-2.5 mb-1 w-full ${isValid || selectedIngredients.length != 0 ? '' : 'input-secondary-invalid'}`}
                                            placeholder="Enter ingredient name and amount"
                                            aria-describedby="add-ingredients-name"
                                            value={inputTextValue}
                                            onChange={(e) => setInputTextValue(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            name="add-ingredients-url"
                                            id="add-ingredients-url"
                                            className={`input-secondary block p-2.5 mb-1 w-full ${isValid || selectedIngredients.length != 0 ? '' : 'input-secondary-invalid'}`}
                                            placeholder="Enter img url (optional)"
                                            aria-describedby="add-ingredients"
                                            value={inputImgValue}
                                            onChange={(e) => setInputImgValue(e.target.value)}
                                        />
                                    </div>
                                    <span className="ml-3 ">
                                        <button
                                            type="button"
                                            className="btn-tertiary inline-flex items-center px-4 py-2 text-sm"
                                            onClick={() => handleAddIngredient()}
                                        >
                                            <PlusIcon
                                                className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            <span>Add</span>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <p className={`pb-4 sm:pb-8 text-sm italic text-red-400 ${isValid || selectedIngredients.length != 0 ? 'opacity-0' : 'opacity-100'}`}>Please add at least 1 ingredient</p>
                </main>
            </div>
        </div>
    );
}
