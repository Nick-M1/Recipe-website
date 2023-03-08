'use client'

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
import React from "react";
import {Toaster} from "react-hot-toast";

type Props= {
    children: React.ReactNode;
    session: Session | null
}

export function SessionProvider({ children, session }: Props) {
    return (
        <Provider>
            <Toaster/>
            { children }
        </Provider>
    );
}