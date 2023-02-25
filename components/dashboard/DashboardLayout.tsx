'use client'

import React, {Fragment, useState, useEffect} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {
    WrenchIcon,
    BookmarkIcon,
    XMarkIcon,
    ArrowRightOnRectangleIcon,
    HomeIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import {classNames} from "../../lib/utils/textUtils";
import {EnvelopeIcon} from "@heroicons/react/24/solid";
import SigninRedirecting from "../accounts/SigninRedirecting";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";


const navigation = [
    {name: "Profile", icon: UserIcon, to: "profile", current: true},
    {name: "My Recipes", icon: HomeIcon, to: "myRecipes", current: false},
    {
        name: "Saved Recipes",
        icon: BookmarkIcon,
        to: "savedRecipes",
        current: false,
    },
];

const secondaryNavigation = [{name: "Logout", icon: ArrowRightOnRectangleIcon}];

type Props = {
    user: UserDB | null
}

export default function DashboardLayout({ user }: Props) {
    // If user not signed in
    if (user == null)
        return <SigninRedirecting/>

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div className="min-h-full">
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 flex z-40 lg:hidden"
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75"/>
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-teal-700">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="px-4">
                                    <Link href="/" className="font-normal text-xl  text-teal-200">
                                        Recipe Website
                                    </Link>
                                </div>
                                <nav
                                    className="mt-5 flex-shrink-0 h-full divide-y divide-teal-800 overflow-y-auto"
                                    aria-label="Sidebar"
                                >
                                    <div className="px-2 space-y-1">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.to}
                                                className={classNames(
                                                    item.current
                                                        ? "bg-teal-800 text-white"
                                                        : "text-teal-100 hover:text-white hover:bg-teal-600",
                                                    "group flex items-center w-full px-2 py-2 text-sm leading-6 font-medium rounded-md"
                                                )}
                                                aria-current={item.current ? "page" : undefined}
                                            >
                                                <item.icon
                                                    className="mr-4 flex-shrink-0 h-6 w-6 text-teal-200"
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="mt-6 pt-6">
                                        <div className="px-2 space-y-1">
                                            {secondaryNavigation.map((item) => (
                                                <button
                                                    key={item.name}
                                                    className="group flex items-center w-full px-2 py-2 text-base font-medium rounded-md text-teal-100 hover:text-white hover:bg-teal-600"
                                                >
                                                    <item.icon
                                                        className="mr-4 h-6 w-6 text-teal-200"
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:flex lg:w-64 lg:flex-col lg:absolute lg:h-full">

                    <div className="flex flex-col flex-grow bg-teal-700 pt-5 pb-4">
                        <div className="px-4">
                            <Link href="/" className="font-normal text-xl  text-teal-200">
                                Recipe Website
                            </Link>
                        </div>
                        <nav
                            className="mt-5 flex-1 flex flex-col divide-y divide-teal-800 overflow-y-auto"
                            aria-label="Sidebar"
                        >
                            <div className="px-2 space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.to}
                                        className={classNames(
                                            item.current
                                                ? "bg-teal-800 text-white"
                                                : "text-teal-100 hover:text-white hover:bg-teal-600",
                                            "group flex items-center w-full px-2 py-2 text-sm leading-6 font-medium rounded-md"
                                        )}
                                        aria-current={item.current ? "page" : undefined}
                                    >
                                        <item.icon
                                            className="mr-4 flex-shrink-0 h-6 w-6 text-teal-200"
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-6 pt-6">
                                <div className="px-2 space-y-1">
                                    {secondaryNavigation.map((item) => (
                                        <button
                                            key={item.name}
                                            className="group flex items-center w-full px-2 py-2 text-sm leading-6 font-medium rounded-md text-teal-100 hover:text-white hover:bg-teal-600"
                                        >
                                            <item.icon
                                                className="mr-4 h-6 w-6 text-teal-200"
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="lg:pl-64 flex flex-col flex-1">
                    <div
                        className="relative flex-shrink-0 flex items-center bg-white border-b border-gray-200 lg:border-none">
                        <button
                            type="button"
                            className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <WrenchIcon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                        <div className="flex items-center py-4 px-4 sm:px-6 lg:px-8">
                            <img
                                className="h-16 w-16 rounded-full block"
                                src={
                                    user
                                        ? user.pic
                                        : "https://res.cloudinary.com/dmtc1wlgq/image/upload/v1641911896/media/avatar/default_zrdbiq.png"
                                }
                                alt=""
                            />
                            <div>
                                <div className="flex items-center">
                                    <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                                        Welcome back, {user?.name}
                                    </h1>
                                </div>
                                <dl className="flex flex-col ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                    <dt className="sr-only">Email</dt>
                                    <dd className="flex items-center text-sm text-gray-500 font-medium sm:mr-6">
                                        <EnvelopeIcon
                                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        {user && user.email}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    {/*<main className="flex-1 pb-8">*/}
                    {/*    /!* Page header *!/*/}
                    {/*    /!*<Outlet/>*!/*/}
                    {/*    xsjijxsx*/}
                    {/*</main>*/}
                </div>
            </div>
        </>
    );
}
