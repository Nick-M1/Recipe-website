'use client'
import {Popover, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {Fragment} from 'react'
import Link from "next/link";
import Image from "next/image";
import searchUrlBuilder from "../../../lib/utils/searchUrlBuilder";


type Props = {
    allCategories: Category[]
    currentSort: string
}

export default function RecipeFilterPopover({ allCategories, currentSort }: Props) {
    return (
        <div className="top-16 w-full max-w-sm px-4">
            <Popover className="relative">
                {({ close }) => (
                    <>
                        <Popover.Button
                            className='group inline-flex items-center btn-primary green-blue-dark-transition-gradient px-5 py-2'
                        >
                            <p className='tracking-wide'>Filter</p>
                            <ChevronDownIcon
                                className='ml-2 h-5 w-5'
                                aria-hidden="true"
                            />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute left-[12rem] md:left-[33rem] z-10 mt-3 w-screen max-w-[27rem] -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-6xl">
                                <div
                                    className="overflow-hidden rounded-lg shadow-lg drop-shadow-md ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-3">
                                        {allCategories.map((category) => (
                                            <Link
                                                key={category.title}
                                                href={searchUrlBuilder(currentSort, category.href)}
                                                onClick={() => close()}
                                                className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                            >
                                                <div
                                                    className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                                    <Image src={category.img} alt={category.title} width={100}
                                                           height={100} aria-hidden="true"/>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {category.title}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {category.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="bg-gray-50 p-4">
                                        <Link
                                            href="/create"
                                            className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                        >
                                          <span className="flex items-center">
                                            <span className="text-sm font-medium text-gray-900">
                                              Create your own recipe
                                            </span>
                                          </span>
                                            <span className="block text-sm text-gray-500">
                                                Can't find the recipe you're looking for? Create your own
                                          </span>
                                        </Link>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}