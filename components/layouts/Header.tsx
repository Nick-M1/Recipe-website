'use client'
import {Fragment, useState, useEffect} from "react";
import {Menu, Popover, Transition} from "@headlessui/react";
import {classNames} from "../../lib/utils/textUtils";
import Link from "next/link";
import {
    ArrowRightOnRectangleIcon,
    BellIcon,
    MagnifyingGlassIcon,
    MinusIcon,
    XMarkIcon
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

const userNavigation = [{name: "Dashboard", to: "/dashboard"}, {name: "Create recipes", to: "/create"}];

export default function Header({ sessionAuth, userDB, allRecipes }: Props) {
    const [logoutPopup , setLogoutPopup] = useState(false)

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
                                    {sessionAuth != null &&
                                        <div>
                                            <Link
                                                href="/create"
                                                className="hidden md:block btn-primary green-blue-dark-gradient ml-6 inline-flex items-center px-4 py-2"
                                            >
                                                Create Recipes
                                            </Link>
                                        </div>
                                    }

                                    <a
                                        href="#"
                                        className="smooth-transition ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                    </a>

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
                                                { sessionAuth != null
                                                    ? (
                                                        <Menu.Items className="smooth-transition origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                                                            { userNavigation.map((item) => (
                                                                <Menu.Item key={item.name}>
                                                                    {({active}) => (
                                                                        <Link
                                                                            href={item.to}
                                                                            className={classNames(
                                                                                active ? "bg-gray-100" : "",
                                                                                "block py-2 px-4 text-sm text-gray-700 smooth-transition"
                                                                            )}
                                                                        >
                                                                            {item.name}
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                            ))}
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <button
                                                                        type='button'
                                                                        onClick={() => setLogoutPopup(true)}
                                                                        className={classNames(
                                                                            active ? "bg-gray-100" : "",
                                                                            "block py-2 px-4 text-sm text-gray-700 w-full text-left smooth-transition"
                                                                        )}
                                                                    >
                                                                        Logout
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    )

                                                    : (
                                                        <Menu.Items className="smooth-transition origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <button
                                                                        type='button'
                                                                        onClick={() => signIn()}
                                                                        className={classNames(
                                                                            active ? "bg-gray-100" : "",
                                                                            "block py-2 px-4 text-sm text-gray-700 w-full text-left smooth-transition"
                                                                        )}
                                                                    >
                                                                        Sign in
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <Link
                                                                        href="/createaccount"
                                                                        className={classNames(
                                                                            active ? "bg-gray-100" : "",
                                                                            "block py-2 px-4 text-sm text-gray-700 smooth-transition"
                                                                        )}
                                                                    >
                                                                        Create account
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    )
                                                }
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
