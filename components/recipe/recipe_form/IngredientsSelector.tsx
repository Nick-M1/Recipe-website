'use client'
import {useState, createRef, useEffect, SetStateAction, Dispatch} from "react";
import {PlusIcon} from "@heroicons/react/24/solid";

type Props = {
    selectedIngredients: Ingredient[]
    setSelectedIngredients: Dispatch<SetStateAction<Ingredient[]>>
}

export default function IngredientsSelector({ selectedIngredients, setSelectedIngredients }: Props) {
    const [inputNameValue, setInputNameValue] = useState("");
    const [inputAmountValue, setInputAmountValue] = useState("");
    const [inputImgValue, setInputImgValue] = useState("");


    const handleAddIngredient = () => {
        if (inputNameValue == '' || inputAmountValue == '')
            return          //todo - not all fields filled in (disable button)

        if ( selectedIngredients.findIndex( ingredient => ingredient.name === inputNameValue ) != -1 )
            return          //todo - duplicate attempted to be added

        const newIngredient = {
            name: inputNameValue,
            amount: inputAmountValue,
            img: inputImgValue
        } as Ingredient

        setSelectedIngredients( prevState => [...prevState, newIngredient] )

        setInputNameValue('')
        setInputAmountValue('')
        setInputImgValue('')
    };

    const handleRemoveIngredient = ( ingredientToRemove: Ingredient ) => {
        setSelectedIngredients( prevState => prevState.filter( ingredient => ingredient.name != ingredientToRemove.name ))
    };

    return (
        <div>
            <div>
                <h1 className="text-lg leading-6 font-medium text-gray-900">
                    Ingredients
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Add the necessary ingredients for your recipe.
                </p>
            </div>

            <div>
                <main>
                    <section aria-labelledby="filter-heading">
                        {/* Active Ingredients */}
                        <div className="bg-gray-50">
                            <div className="max-w-7xl mx-auto py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
                                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
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
                                                className="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900"
                                            >
                                            <span>{ingredient.name}</span>
                                            <button
                                                type="button"
                                                className="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
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
                        className="max-w-2xl mx-auto pt-4 pb-4 px-4 sm:pt-4 sm:pb-8 sm:px-6 lg:max-w-7xl lg:px-8"
                    >
                        <div
                            className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            <div className="space-y-2">
                                <label
                                    htmlFor="add-ingredients"
                                    className="block text-sm font-medium text-gray-700 py-2"
                                >
                                    Add Ingredients
                                </label>
                                <div className="flex">
                                    <div className="flex-grow md:flex md:gap-x-3">
                                        <input
                                            type="text"
                                            name="add-ingredients-name"
                                            id="add-ingredients-name"
                                            className="block shadow-sm p-2 mb-1 md:mb-0 focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm border border-gray-300 rounded-md"
                                            placeholder="Enter ingredient name"
                                            aria-describedby="add-ingredients-name"
                                            value={inputNameValue}
                                            onChange={(e) => setInputNameValue(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            name="add-ingredients-amount"
                                            id="add-ingredients-amount"
                                            className="block shadow-sm p-2 mb-1 md:mb-0 focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm border border-gray-300 rounded-md"
                                            placeholder="Enter amount"
                                            aria-describedby="add-ingredients-amount"
                                            value={inputAmountValue}
                                            onChange={(e) => setInputAmountValue(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            name="add-ingredients-url"
                                            id="add-ingredients-url"
                                            className="block shadow-sm p-2 mb-1 md:mb-0 focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm border border-gray-300 rounded-md"
                                            placeholder="Enter img url (optional)"
                                            aria-describedby="add-ingredients"
                                            value={inputImgValue}
                                            onChange={(e) => setInputImgValue(e.target.value)}
                                        />
                                    </div>
                                    <span className="ml-3 ">
                                        <button
                                            type="button"
                                            className="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
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
                </main>
            </div>
        </div>
    );
}
