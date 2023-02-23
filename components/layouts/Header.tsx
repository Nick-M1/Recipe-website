'use client'
import {Fragment, useState, useEffect} from "react";
// import { useDispatch, useSelector } from "react-redux";

import {Menu, Popover, Transition} from "@headlessui/react";
import {classNames} from "../../lib/utils/textUtils";
import Link from "next/link";
import {MagnifyingGlassIcon, MinusIcon, XMarkIcon} from "@heroicons/react/24/outline";
import Searchbar from "../interactive_components/Searchbar";
import Image from "next/image";

// import Logout from "../accounts/Logout";
// import { loadUser, getAvatar } from "../../redux/actions/user";

const userNavigation = [{name: "Dashboard", to: "/dashboard"}];


export default function Header() {
    // const { token } = useSelector((state) => state.auth);
    const token = false
    // const { user, avatar } = useSelector((state) => state.user);

    const [modal, setModal] = useState(false);

    // const dispatch = useDispatch();

    // useEffect(() => {
    //   if (token) {
    //     dispatch(loadUser());
    //     dispatch(getAvatar());
    //   }
    // }, [token]);

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
                            <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                                    <div className="flex-shrink-0 flex items-center">
                                        <Link href="/" className="font-semibold tracking-wider text-xl text-teal-700 flex">
                                            <Image src={'/brand-logo.png'} alt={''} width={50} height={50}/>
                                            <span className='ml-2'>Recipe <br/> Website</span>

                                        </Link>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1 xl:col-span-6 flex items-center py-4  px-6 md:px-0">
                                    <Searchbar/>

                                    {/*<div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">*/}
                                    {/*  <div className="w-full">*/}
                                    {/*    <label htmlFor="search" className="sr-only">*/}
                                    {/*      Search*/}
                                    {/*    </label>*/}
                                    {/*    <div className="relative">*/}
                                    {/*      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">*/}
                                    {/*        <MagnifyingGlassIcon*/}
                                    {/*          className="h-5 w-5 text-gray-400"*/}
                                    {/*          aria-hidden="true"*/}
                                    {/*        />*/}
                                    {/*      </div>*/}
                                    {/*      <input*/}
                                    {/*        id="search"*/}
                                    {/*        name="search"*/}
                                    {/*        className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"*/}
                                    {/*        placeholder="Search"*/}
                                    {/*        type="search"*/}
                                    {/*      />*/}
                                    {/*    </div>*/}
                                    {/*  </div>*/}
                                    {/*</div>*/}

                                </div>
                                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                                    {/* Mobile menu button */}
                                    <Popover.Button
                                        className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
                                        <span className="sr-only">Open menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                        ) : (
                                            <MinusIcon className="block h-6 w-6" aria-hidden="true"/>
                                        )}
                                    </Popover.Button>
                                </div>
                                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                                    {/* <a
                    href="/"
                    className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </a> */}

                                    {/* Profile dropdown */}
                                    {/*{token && (*/}
                                    {/*  <Menu as="div" className="flex-shrink-0 relative ml-5">*/}
                                    {/*    <div>*/}
                                    {/*      <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">*/}
                                    {/*        <span className="sr-only">Open user menu</span>*/}
                                    {/*        <img*/}
                                    {/*          className="h-8 w-8 rounded-full"*/}
                                    {/*          src={*/}
                                    {/*            avatar && avatar.avatar*/}
                                    {/*              ? avatar.avatar*/}
                                    {/*              : "https://res.cloudinary.com/dmtc1wlgq/image/upload/v1641911896/media/avatar/default_zrdbiq.png"*/}
                                    {/*          }*/}
                                    {/*          alt=""*/}
                                    {/*        />*/}
                                    {/*      </Menu.Button>*/}
                                    {/*    </div>*/}
                                    {/*    <Transition*/}
                                    {/*      as={Fragment}*/}
                                    {/*      enter="transition ease-out duration-100"*/}
                                    {/*      enterFrom="transform opacity-0 scale-95"*/}
                                    {/*      enterTo="transform opacity-100 scale-100"*/}
                                    {/*      leave="transition ease-in duration-75"*/}
                                    {/*      leaveFrom="transform opacity-100 scale-100"*/}
                                    {/*      leaveTo="transform opacity-0 scale-95"*/}
                                    {/*    >*/}
                                    {/*      <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">*/}
                                    {/*        {userNavigation.map((item) => (*/}
                                    {/*          <Menu.Item key={item.name}>*/}
                                    {/*            {({ active }) => (*/}
                                    {/*              <Link*/}
                                    {/*                to={item.to}*/}
                                    {/*                className={classNames(*/}
                                    {/*                  active ? "bg-gray-100" : "",*/}
                                    {/*                  "block py-2 px-4 text-sm text-gray-700"*/}
                                    {/*                )}*/}
                                    {/*              >*/}
                                    {/*                {item.name}*/}
                                    {/*              </Link>*/}
                                    {/*            )}*/}
                                    {/*          </Menu.Item>*/}
                                    {/*        ))}*/}
                                    {/*        <Menu.Item>*/}
                                    {/*          <button*/}
                                    {/*            className="block py-2 px-4 text-sm text-gray-700"*/}
                                    {/*            onClick={() => setModal(true)}*/}
                                    {/*          >*/}
                                    {/*            {" "}*/}
                                    {/*            Logout*/}
                                    {/*          </button>*/}
                                    {/*        </Menu.Item>*/}
                                    {/*      </Menu.Items>*/}
                                    {/*    </Transition>*/}
                                    {/*  </Menu>*/}
                                    {/*)}*/}
                                    {!token && (
                                        <Link
                                            href="/login"
                                            className="ml-6 inline-flex items-center px-4 py-2 btn-secondary"
                                        >
                                            Sign in
                                        </Link>
                                    )}

                                    {!token && (
                                        <Link
                                            href="/register"
                                            className="ml-6 inline-flex items-center px-4 py-2 btn-primary"
                                        >
                                            Sign Up
                                        </Link>
                                    )}
                                    {token && (
                                        <Link
                                            href="/recipe/create"
                                            className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                        >
                                            Create Recipe
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                            <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                                {!token && (
                                    <Link
                                        href="/login"
                                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700"
                                    >
                                        Sign in
                                    </Link>
                                )}

                                {!token && (
                                    <Link
                                        href="/register"
                                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700"
                                    >
                                        Sign Up
                                    </Link>
                                )}
                                {token && (
                                    <Link
                                        href="/recipe/create"
                                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700"
                                    >
                                        Create Recipe
                                    </Link>
                                )}
                                {/* {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
                      'block rounded-md py-2 px-3 text-base font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))} */}
                            </div>
                            {/*{token && (*/}
                            {/*  <div className="border-t border-gray-200 pt-4 pb-3">*/}
                            {/*    <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">*/}
                            {/*      <div className="flex-shrink-0">*/}
                            {/*        <img*/}
                            {/*          className="h-10 w-10 rounded-full"*/}
                            {/*          src={*/}
                            {/*            avatar*/}
                            {/*              ? avatar.avatar*/}
                            {/*              : "https://res.cloudinary.com/dmtc1wlgq/image/upload/v1641911896/media/avatar/default_zrdbiq.png"*/}
                            {/*          }*/}
                            {/*          alt=""*/}
                            {/*        />*/}
                            {/*      </div>*/}
                            {/*      <div className="ml-3">*/}
                            {/*        <div className="text-base font-medium text-gray-800">*/}
                            {/*          {user && user.username}*/}
                            {/*        </div>*/}
                            {/*        <div className="text-sm font-medium text-gray-500">*/}
                            {/*          {user && user.email}*/}
                            {/*        </div>*/}
                            {/*      </div>*/}
                            {/*      /!* <button*/}
                            {/*      type="button"*/}
                            {/*      className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"*/}
                            {/*    >*/}
                            {/*      <span className="sr-only">View notifications</span>*/}
                            {/*      <BellIcon className="h-6 w-6" aria-hidden="true" />*/}
                            {/*    </button> *!/*/}
                            {/*    </div>*/}
                            {/*    <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">*/}
                            {/*      {userNavigation.map((item) => (*/}
                            {/*        <Link*/}
                            {/*          key={item.name}*/}
                            {/*          to={item.to}*/}
                            {/*          className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"*/}
                            {/*        >*/}
                            {/*          {item.name}*/}
                            {/*        </Link>*/}
                            {/*      ))}*/}
                            {/*      <button*/}
                            {/*        className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"*/}
                            {/*        onClick={() => setModal(true)}*/}
                            {/*      >*/}
                            {/*        {" "}*/}
                            {/*        Logout*/}
                            {/*      </button>*/}
                            {/*    </div>*/}
                            {/*  </div>*/}
                            {/*)}*/}
                        </Popover.Panel>
                    </>
                )}
            </Popover>
            {/*{modal && <Logout modal={modal} setModal={setModal} />}*/}
        </>
    );
}
