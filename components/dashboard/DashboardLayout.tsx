'use client'

import React, {Fragment, useState, useEffect} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {
    Bars3Icon,
    BookmarkIcon,
    XMarkIcon,
    ArrowRightOnRectangleIcon,
    PencilSquareIcon,
    UserIcon,
    Cog6ToothIcon,
    HeartIcon
} from "@heroicons/react/24/outline";

import Link from "next/link";
import {classNames} from "../../lib/utils/textUtils";
import {EnvelopeIcon} from "@heroicons/react/24/solid";
import SigninRedirecting from "../accounts/SigninRedirecting";
import {useSelectedLayoutSegment} from "next/navigation";
import PopupCustom from "../interactive_components/Popups/PopupCustom";
import {signOut} from "next-auth/react";


const navigation = [
    {name: "Profile",           icon: UserIcon,         to: "dashboard"},
    {name: "Update Profile",    icon: Cog6ToothIcon,    to: "updateprofile"},
    {name: "My Recipes",        icon: PencilSquareIcon, to: "myrecipes"},
    {name: "Saved Recipes",     icon: BookmarkIcon,     to: "bookmarkedrecipes"},
    // {name: "Liked Recipes",     icon: HeartIcon,     to: "likedrecipes"},
];



type Props = {
    user: UserDB | null
}

export default function DashboardLayout({ user }: Props) {
    // If user not signed in
    if (user == null)
        return <SigninRedirecting/>

    const segmentCurrent = useSelectedLayoutSegment();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [logoutPopup, setLogoutPopup] = useState(false);

    const secondaryNavigation = [
        { name: "Logout", icon: ArrowRightOnRectangleIcon, func: () => { setSidebarOpen(false); setLogoutPopup(true) } }
    ];

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
                            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 green-blue-dark-gradient">
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
                                                    item.to === segmentCurrent
                                                        ? "bg-teal-800 hover:bg-teal-900 text-white"
                                                        : "text-teal-100 hover:text-white hover:bg-teal-600",
                                                    "group flex items-center w-full px-2 py-2 text-sm leading-6 font-medium rounded-md smooth-transition"
                                                )}
                                                aria-current={item.to === segmentCurrent ? "page" : undefined}
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
                                                    className="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-teal-100 hover:text-white hover:bg-teal-600 smooth-transition"
                                                    onClick={item.func}
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
                <div className="hidden lg:flex lg:w-64 lg:flex-col lg:absolute lg:h-[140%] ">

                    <div className="flex flex-col flex-grow  pt-5 pb-4 green-blue-dark-gradient">
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
                                        className={
                                            classNames(
                                                item.to === segmentCurrent
                                                    ? "bg-teal-800 hover:bg-teal-900 text-white"
                                                    : "text-teal-100 hover:text-white hover:bg-teal-600",
                                                "group flex items-center w-full px-2 py-2 text-sm leading-6 font-medium rounded-md smooth-transition"
                                        )}
                                        aria-current={item.to === segmentCurrent ? "page" : undefined}
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
                                            className="group flex items-center w-full px-2 py-2 text-sm leading-6 font-medium rounded-md text-teal-100 hover:text-white hover:bg-teal-600 smooth-transition"
                                            onClick={item.func}
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
                        className="relative flex-shrink-0 flex items-center bg-white border-b border-gray-200 ">
                        <button
                            type="button"
                            className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon
                                className="h-6 w-6 transform active:rotate-180 transition duration-500 ease-in-out"
                                aria-hidden="true"
                            />
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
                { logoutPopup &&
                    <PopupCustom
                        modal={logoutPopup}
                        setModal={setLogoutPopup}
                        confirmHandler={() => signOut()}

                        titleText={'Logging out'}
                        descriptionText={'Are you sure you want to log out ?'}
                        buttonText={'Logout'}

                        IconImg={ArrowRightOnRectangleIcon}
                    />
                }
            </div>
        </>
    );
}
