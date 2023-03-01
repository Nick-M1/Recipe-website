'use client'
import {Combobox, Listbox, Menu, Transition} from "@headlessui/react";
import React, {FormEvent, Fragment, useState} from "react";
import Link from "next/link";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";
import {classNames} from "../../lib/utils/textUtils";
import Image from "next/image";


type Props = {
    allRecipes: Recipe[]
}

export default function Searchbar({ allRecipes }: Props) {
    const router = useRouter();
    const [selectedPerson, setSelectedPerson] = useState('')
    const [query, setQuery] = useState('')

    const filteredPeople =
        query === ''
            ? [] as Recipe[]
            : allRecipes.filter((recipe) => {
                return recipe.title.toLowerCase().includes(query.toLowerCase())
            }).slice(0, 8)

    const handleSearch = async (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.key != 'Enter')
            return

        router.push(`/search?query=${query}`)
        setTimeout(() => setQuery(""), 800)

    };

    return (
        <div className='relative border-none cursor-pointer w-full' onKeyUp={(e) => handleSearch(e)}>

                <Combobox value={selectedPerson} onChange={setSelectedPerson}>
                    <div className="group relative flex items-center w-full h-12 rounded-lg border border-gray-200 hover:border-gray-400 focus-within:ring-1 focus-within:ring-teal-400 overflow-hidden smooth-transition">
                        <div className="grid place-items-center h-full w-12 text-gray-300 border-none">
                            <button type="submit" >
                                <MagnifyingGlassIcon className="pointer-events-non pl-0 h-6 w-6 border-none group-hover:text-gray-500 smooth-transition" aria-hidden="true" />
                            </button>
                        </div>
                        <Combobox.Input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder='Search...'
                            className='peer h-full w-full outline-none border-none text-sm text-gray-700 md:pr-2 bg-none focus:outline-none focus:ring-0 smooth-transition' />
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >

                        <Combobox.Options className='absolute z-10 w-full rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            { filteredPeople.map((recipe) => (
                                <Combobox.Option key={recipe.id} value={recipe.title}>
                                    {({ active, selected  }) => (
                                        <Link
                                            href={`recipe/${recipe.id}`}
                                            className={
                                                classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm smooth-transition flex'
                                                )}>
                                            {recipe.title}
                                        </Link>
                                    )}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    </Transition>
                </Combobox>
        </div>
    )
}