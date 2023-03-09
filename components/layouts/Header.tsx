'use client'
import {Fragment, useState, useEffect} from "react";
import {Menu, Popover, Transition} from "@headlessui/react";
import {classNames} from "../../lib/utils/textUtils";
import Link from "next/link";
import {
    BellIcon,
    ArrowRightOnRectangleIcon,
    PencilSquareIcon,
    HomeIcon,
    DocumentPlusIcon,
    BookmarkIcon,
    ArrowLeftOnRectangleIcon,
    UserPlusIcon, UserIcon
} from "@heroicons/react/24/outline";
import Searchbar from "../interactive_components/Searchbar";
import Image from "next/image";
import {signIn, signOut} from "next-auth/react";
import {Session} from "next-auth";
import PopupCustom from "../interactive_components/Popups/PopupCustom";



type Props = {
    sessionAuth: Session | null
    userDB: UserDB | null
    allRecipes: Recipe[]
}

function menuitemClassname( divideTop: boolean, { active, disabled }: { active: boolean, disabled: boolean }) {
    return classNames(
        divideTop ? 'mt-1 border-t border-gray-100' : '',
        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
        disabled ? 'cursor-not-allowed opacity-50' : '',
        "block w-full text-left py-2 px-4 text-sm smooth-transition"
    )
}




export default function Header({ sessionAuth, userDB, allRecipes }: Props) {
    const [logoutPopup , setLogoutPopup] = useState(false)

    const userNavigation_signedin = [
        { isButton: false, name: "My Profile",      to: `/profile/${userDB?.id}`,               icon: UserIcon,                      divideTop: false },
        { isButton: false, name: "Dashboard",       to: "/dashboard",                          icon: HomeIcon,                      divideTop: false },
        { isButton: false, name: "My recipes",      to: "/myrecipes",                          icon: PencilSquareIcon,              divideTop: false },
        { isButton: false, name: "Create recipes",  to: "/create",                             icon: DocumentPlusIcon,              divideTop: false },
        { isButton: false, name: "Saved recipes",   to: "/bookmarkedrecipes",                  icon: BookmarkIcon,                  divideTop: false },
        { isButton: true,  name: "Logout",          func: () => setLogoutPopup(true),     icon: ArrowRightOnRectangleIcon,      divideTop: true },
    ];
    const userNavigation_notsignedin = [
        { isButton: true,  name: "Sign in",         func: () => signIn(),                      icon: ArrowLeftOnRectangleIcon,      divideTop: false },
        { isButton: false, name: "Create account",  to: "/createaccount",                      icon: UserPlusIcon,      divideTop: false },
    ];

    return (
        <>
            {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
            <Popover
                as="header"
                className={({open}) =>
                    classNames(
                        open ? "fixed inset-0 z-40 overflow-y-auto" : "",
                        "bg-white shadow-sm lg:static lg:overflow-y-visible"
                    )
                }
            >
                {({open}) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="relative flex justify-between xl:grid xl:grid-cols-12 md:gap-8">
                                <div className="flex  lg:static xl:col-span-2">
                                    <div className="flex-shrink-0 flex items-center">
                                        <Link href="/" className="flex">
                                            <Image src={'/brand-logo.png'} alt={''} width={50} height={50} className='w-14 h-14' />
                                            <h1 className='hidden md:block ml-2 green-blue-dark-gradient text-gradient font-extrabold tracking-wider text-2xl '>
                                                Recipe <br/> Website
                                            </h1>

                                        </Link>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1 xl:col-span-6 flex items-center py-4 pl-3 md:px-0">
                                    <Searchbar allRecipes={allRecipes} />
                                </div>

                                <div className="flex items-center justify-end col-span-4">
                                    { sessionAuth == null
                                        ? (
                                            <button onClick={() => signIn()} className="hidden md:block btn-primary green-blue-dark-transition-gradient ml-6 inline-flex items-center px-4 py-2">
                                                Sign in
                                            </button>
                                        )
                                        : (
                                            <Link
                                                href="/create"
                                                className="hidden md:block btn-primary green-blue-dark-transition-gradient ml-6 inline-flex items-center px-4 py-2"
                                            >
                                                Create Recipes
                                            </Link>
                                        )
                                    }

                                    <Link href="/dashboard" className="smooth-transition group ml-5 flex-shrink-0 relative bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500" >
                                        <BellIcon className="h-7 w-7" aria-hidden="true"/>
                                        <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-300 border-2 border-white rounded-full -top-1 -right-1 group-hover:bg-red-500 smooth-transition"> 4 </div>
                                    </Link>

                                    {/* Profile dropdown */}
                                        <Menu as="div" className="flex-shrink-0 relative ml-5">
                                            <div>
                                                <Menu.Button
                                                    className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-offset-teal-400 hover:ring-1 hover:ring-offset-1 hover:ring-offset-teal-300 smooth-transition">
                                                    <span className="sr-only">Open user menu</span>
                                                    <Image
                                                        width={30} height={30}
                                                        className="h-8 w-8 rounded-full"
                                                        src={ userDB == null ? "https://res.cloudinary.com/dmtc1wlgq/image/upload/v1641911896/media/avatar/default_zrdbiq.png" : userDB.pic}
                                                        alt=""
                                                    />
                                                </Menu.Button>
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
                                                <Menu.Items className="smooth-transition origin-top-right absolute z-10 right-0 mt-2 w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">

                                                    <Menu.Item>
                                                        <div className="px-4 py-3 border-b border-gray-100">
                                                            <p className="text-sm leading-5">{ sessionAuth == null ? 'Not signed in' : 'Signed in as'}</p>
                                                            <p className="truncate text-sm font-medium leading-5 text-gray-900 font-semibold">
                                                                { sessionAuth != null && userDB?.email}
                                                            </p>
                                                        </div>
                                                    </Menu.Item>




                                                    { ( sessionAuth == null ? userNavigation_notsignedin : userNavigation_signedin )
                                                        .map(item => (
                                                            <Menu.Item key={item.name}>
                                                                {( itemrenderPropArgs) => (

                                                                    item.isButton
                                                                        ? (
                                                                            <button
                                                                                type='button'
                                                                                onClick={item.func}
                                                                                className={`${menuitemClassname(item.divideTop, itemrenderPropArgs)} flex`}
                                                                            >
                                                                                <item.icon className='h-5 w-5 mr-2.5'/>
                                                                                <span>{item.name}</span>
                                                                            </button>
                                                                        )
                                                                        : (
                                                                            <Link
                                                                                href={item.to!}
                                                                                className={`${menuitemClassname(item.divideTop, itemrenderPropArgs)} flex`}
                                                                            >
                                                                                <item.icon className='h-5 w-5 mr-2.5'/>
                                                                                <span>{item.name}</span>
                                                                            </Link>
                                                                        )
                                                                )}
                                                            </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>

                                </div>
                            </div>
                        </div>

                    </>
                )}
            </Popover>

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
        </>
    );
}
