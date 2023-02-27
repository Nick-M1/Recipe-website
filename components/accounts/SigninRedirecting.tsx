'use client'

import {signIn} from "next-auth/react";
import {useEffect} from "react";
import SpinnerComponent from "../interactive_components/SpinnerComponent";

//todo: Make nice
export default function SigninRedirecting() {
    useEffect(() => {
        signIn()
    }, [])

    return (
        <div className="animate-pulse w-full h-screen bg-gray-50 flex flex-col items-center pt-20">
            <SpinnerComponent size={14}/>
            <h1 className='green-blue-dark-gradient text-gradient font-extrabold text-2xl  mt-3'>
                Redirecting to Sign In...
            </h1>

        </div>
    );
}