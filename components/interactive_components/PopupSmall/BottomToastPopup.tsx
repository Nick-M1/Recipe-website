
import React, {useState, useRef, SetStateAction, Dispatch, useEffect} from "react";
import {classNames} from "../../../lib/utils/textUtils";

type Props = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>

    msgText: string
}

export default function BottomToastPopup({ open, setOpen, msgText }: Props) {
    const [isHidden, setIsHidden] = useState(false)
    useEffect(() => {
        setTimeout(() => setIsHidden( !open ), 500)
    }, [open])

    return (
        <div className={
                classNames(
                    "fixed bottom-0 right-0 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow drop-shadow-md dark:text-gray-400 dark:bg-gray-800",
                    `transition-all ease-in-out duration-200 ${open ? "opacity-100" : "opacity-0"}`,
                    isHidden ? 'hidden' : 'block'
            )}
            role="alert">
            <div
                className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"></path>
                </svg>
            </div>
            <div className="ml-3 text-sm font-normal">{msgText}</div>
            <button type="button"
                    onClick={() => setOpen(false)}
                    className={`ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 smooth-transition ${open ? '' : 'cursor-default'}`}
                    data-dismiss-target="#toast-success" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"></path>
                </svg>
            </button>
        </div>
        // <div className="bg-indigo-600 z-10 absolute w-full">
        //     <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        //         <div className="flex flex-wrap items-center justify-between">
        //             <div className="flex w-0 flex-1 items-center">
        //         <span className="flex rounded-lg bg-indigo-800 p-2">
        //           <MegaphoneIcon className="h-6 w-6 text-white" aria-hidden="true"/>
        //         </span>
        //                 <p className="ml-3 truncate font-medium text-white">
        //                     <span className="md:hidden">Mid-Season Sale now on!</span>
        //                     <span
        //                         className="hidden md:inline">Mid-Season Sale now on! Up to 50% off</span>
        //                 </p>
        //             </div>
        //             <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
        //                 <Link
        //                     href="/search"
        //                     className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50"
        //                 >
        //                     Go to sale
        //                 </Link>
        //             </div>
        //             <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
        //                 <button
        //                     type="button"
        //                     className="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
        //                     onClick={() => setOpen(false)}
        //                 >
        //                     <span className="sr-only">Dismiss</span>
        //                     <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}
