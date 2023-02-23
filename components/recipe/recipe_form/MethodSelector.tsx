'use client'
import {useState, useEffect, createRef, Dispatch, SetStateAction} from "react";
import {MinusIcon, PlusIcon} from "@heroicons/react/24/solid";
import ReactMarkdown from "react-markdown";

type Props = {
    selectedMethod: MethodItem[]
    setSelectedMethod: Dispatch<SetStateAction<MethodItem[]>>
}

export default function MethodSelector({selectedMethod, setSelectedMethod}: Props) {
    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");

    const [img1Input, setImg1Input] = useState('');
    const [img2Input, setImg2Input] = useState('');
    const [img3Input, setImg3Input] = useState('');

    useEffect(() => console.log(selectedMethod))

    const handleAddMethod = () => {
        if (titleInput == '' || descriptionInput == '')
            return          //todo - not all fields filled in (disable button)

        if (selectedMethod.findIndex(method => method.title === titleInput && method.description == descriptionInput) != -1)
            return          //todo - duplicate attempted to be added

        const newMethod = {
            title: titleInput,
            description: descriptionInput,
            imgs: [ img1Input, img2Input, img3Input ].filter( elem => elem != '' )
        } as MethodItem

        setSelectedMethod(prevState => [...prevState, newMethod])

        setTitleInput('')
        setDescriptionInput('')
        setImg1Input('')
        setImg2Input('')
        setImg3Input('')
    };

    const handleRemoveMethod = (methodToRemove: MethodItem) => {
        setSelectedMethod(prevState => prevState.filter(method => method.title != methodToRemove.title))
    };

    return (
        <>
            <main className='pb-10'>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-lg leading-6 font-medium text-gray-900">
                            Method
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Fill in the method to create your new recipe.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="space-y-1">
                            <div className="flex">
                                <div className="flex-grow">
                                    <input
                                        type="text"
                                        name="add-method-title"
                                        id="add-method-title"
                                        className="block shadow-sm p-2 mb-1 md:mb-0 focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm border border-gray-300 rounded-md w-full"
                                        placeholder="Enter method title"
                                        aria-describedby="add-method-title"
                                        value={titleInput}
                                        onChange={(e) => setTitleInput(e.target.value)}
                                    />
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={5}
                                        className="block w-full shadow-sm mb-5 p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm border border-gray-300 rounded-md"
                                        placeholder="Add egg and meat until egg mixture is combined..."
                                        value={descriptionInput}
                                        onChange={(e) => setDescriptionInput(e.target.value)}
                                    />
                                    <div className='md:flex md:gap-x-2'>
                                        { [[img1Input, setImg1Input], [img2Input, setImg2Input], [img3Input, setImg3Input]].map( (stateTuple, idx) => (
                                            <input
                                                key={idx}
                                                type="text"
                                                name={`add-method-img-${idx}`}
                                                id={`add-method-img-${idx}`}
                                                className="block shadow-sm p-2 mb-1 md:mb-0 focus:outline-none focus:ring-teal-500 focus:border-teal-500 text-sm border border-gray-300 rounded-md w-full"
                                                placeholder={`Enter img url ${idx+1} (optional)`}
                                                aria-describedby="add-method-img"
                                                value={stateTuple[0] as string}
                                                onChange={(e) => (stateTuple[1] as Dispatch<SetStateAction<string>>)(e.target.value) }
                                            />
                                        ))}

                                    </div>
                                </div>
                                <div className="ml-3">
                                    <button
                                        type="button"
                                        className="bg-white inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                        onClick={() => handleAddMethod()}
                                    >
                                        <PlusIcon
                                            className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        <span>Add</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="border-b border-gray-200">
                            <ul className="divide-y divide-gray-200">
                                {selectedMethod.map((method, idx) => (
                                    <li key={idx} className="py-4 flex">
                                        <div className="ml-3 flex flex-grow justify-between">
                                            <div>
                                                <span className="text-base font-medium text-gray-900">
                                                  {idx + 1}){" "}
                                                </span>
                                                <span className="text-base font-medium text-gray-900">
                                                  {method.title}
                                                </span>

                                                <br/>
                                                <p className='ml-4 text-sm text-gray-500'>
                                                    <ReactMarkdown>{method.description}</ReactMarkdown>
                                                </p>
                                                <p className='ml-4 mt-4 text-sm text-gray-500'>
                                                    Image urls:

                                                    { method.imgs.length == 0 ? <span className='ml-1'>none</span> : method.imgs.map(i => <span><br/>- {i}</span>) }
                                                </p>
                                            </div>

                                            <div className="">
                                                <button
                                                    type="button"
                                                    className="bg-white inline-flex items-center px-2 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                                    onClick={() => handleRemoveMethod(method)}
                                                >
                                                    <MinusIcon
                                                        className="-ml-2 mr-1 h-5 w-5 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
