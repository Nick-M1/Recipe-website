'use client'

import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import {Fragment} from "react";
import Link from "next/link";
import {classNames} from "../../lib/utils/textUtils";
import searchUrlBuilder from "../../lib/utils/searchUrlBuilder";

//todo: Refactor to be more versatile & create wrapper for sort options

// type Props = {
//     optionNames: string[]
// }

// export default function DropdownComponent({ optionNames }: Props) {
export default function DropdownComponent({ optionNames, currentSort, currentCategory }: { optionNames: SortOptionsRecipeAndAuthor[], currentSort: string, currentCategory: string }) {
    return (
        <Menu as="div" className="relative inline-block text-left px-3 py-1">
            <div>
                <Menu.Button
                    className="group inline-flex justify-center text-sm font-medium text-gray-700 smooth-transition hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group smooth-transition-hover:text-gray-500"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>

            {/* SORTING */}
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {optionNames.map( optionItem => (
                            <Menu.Item key={optionItem.name}>
                                {({active}) => (
                                    <Link
                                        href={searchUrlBuilder(optionItem.query, currentCategory)}
                                        className={
                                            classNames(
                                                currentSort == optionItem.query ? 'font-semibold text-gray-800' : 'text-gray-500',
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm smooth-transition'
                                            )}
                                    >
                                        {optionItem.name}
                                    </Link>

                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}