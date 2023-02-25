'use client'

import {signIn} from "next-auth/react";
import {useEffect} from "react";

//todo: Make nice
export default function SigninRedirecting() {
    useEffect(() => {
        signIn()
    }, [])

    return (
        <div className='text-center p-20 h-screen'>
            Redirecting to sign in
        </div>
    );
}