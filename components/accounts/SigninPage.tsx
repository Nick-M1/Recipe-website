'use client'

import { LockClosedIcon } from '@heroicons/react/20/solid'
import Link from "next/link";
import Image from "next/image";
import {signIn, useSession} from "next-auth/react";
import {BsFacebook, BsGoogle} from "react-icons/bs";
import {FaApple} from "react-icons/fa";

export default function SigninPage() {

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 mt-10 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <Link href='/'>
                        <Image
                            height={200} width={200}
                            className="mx-auto h-12 w-auto"
                            src="/brand-logo.png"
                            alt="Shopping logo"
                        />
                    </Link>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Not registered?{' '}
                        <Link href="/createaccount" className="font-medium text-cyan-600 hover:text-teal-400 smooth-transition">
                            Create an account
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" action="components#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md px-3 py-2 focus:z-10 hover:z-10 sm:text-sm input-primary"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md px-3 py-2 focus:z-10 hover:z-10 sm:text-sm input-primary"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 accent-cyan-600 group-hover:accent-cyan-700 group-hover:active:accent-cyan-700 text-indigo-600 focus:ring-indigo-500 smooth-transition"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link href="components#" className="font-medium text-cyan-600 hover:text-teal-400 smooth-transition">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn-secondary btn-bouncy group relative flex w-full justify-center py-2 px-4"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <LockClosedIcon className="h-5 w-5 text-cyan-600 group-hover:text-teal-300 smooth-transition" aria-hidden="true" />
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>

                <div className="space-y-8">
                    <div className="flex items-center text-center before:content-[''] before:flex-1 before:border-b-2 before:mr-2 after:content-[''] after:flex-1 after:border-b-2 after:ml-2 text-xs font-semibold tracking-wide text-gray-600 ">
                        OR
                    </div>

                    <div className="grid grid-cols-2 gap-x-4">
                        <button onClick={() => signIn('google')} className="btn-primary px-0 btn-bouncy flex justify-center bg-blue-500 hover:bg-blue-700 focus:ring-blue-700">
                            <BsGoogle size={18} className="mr-2 mt-0.5" />
                            <span className="sr-only">Continue with</span> Google
                        </button>
                        <button onClick={() => signIn('facebook')} className="bg-black hover:bg-gray-700 flex justify-center btn-bouncy btn-primary px-0 hover:ring-slate-700 focus:ring-slate-700">
                            <BsFacebook size={23} className="mr-2" />
                            <span className="sr-only">Continue with</span> Facebook
                        </button>
                    </div>
                    {/*<div className="grid grid-cols-2 gap-x-4">*/}
                    {/*    <button onClick={() => signIn('apple')} className="bg-black hover:bg-gray-800 flex btn-bouncy btn-primary">*/}
                    {/*        <FaApple size={23} className="ml-5 mr-2" />*/}
                    {/*        <span className="sr-only">Continue with</span> Apple*/}
                    {/*    </button>*/}
                    {/*     todo: apple login */}
                    {/*    <button onClick={() => signIn('facebook')} className="bg-black hover:bg-gray-800 flex btn-bouncy btn-primary">*/}
                    {/*        <FaApple size={23} className="ml-5 mr-2" />*/}
                    {/*        <span className="sr-only">Continue with</span> Apple*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>


            </div>
        </div>
    )
}