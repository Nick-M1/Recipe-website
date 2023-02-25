'use client'
import {useState, useEffect, Dispatch, SetStateAction} from "react";
import {checkImage} from "../../../lib/utils/urlUtils";

type Props = {
    selectedPicture: string
    setSelectedPicture: Dispatch<SetStateAction<string>>

    isValid: boolean
}

export default function PictureUpload({ selectedPicture, setSelectedPicture, isValid }: Props) {
    const [isvalidOnpress, setIsvalidOnpress] = useState(true)            // checks on every key-press from user

    useEffect(() => {

        const checkImageHandler = async () => {
            setIsvalidOnpress(
                await checkImage(selectedPicture)
            )
        }
        if (selectedPicture != '')
            checkImageHandler()
        else
            setIsvalidOnpress(true)

    }, [selectedPicture])

    return (
        <div>
            <h1 className={`text-lg leading-6 font-medium mt-5 ${!isvalidOnpress || !isValid ? 'text-red-700 dark:text-red-500' : 'text-gray-900' }`}>Picture</h1>
            <p className={`mt-1 text-sm inline-flex ${!isvalidOnpress || !isValid ? 'text-red-500 dark:text-red-400' : 'text-gray-500' }`}>
                Enter URL of a picture of the food after it's complete.
            </p>
            <div className="mt-4 flex justify-center">
                <input
                    type="text"
                    name="add-method-title"
                    id="add-method-title"
                    className={`block input-secondary p-4 mb-1 md:mb-0 w-full ${!isvalidOnpress || !isValid ? 'input-secondary-invalid' : '' }`}
                    placeholder="Enter food image URL"
                    aria-describedby="add-method-title"
                    value={selectedPicture}
                    onChange={(e) => setSelectedPicture(e.target.value)}
                />
            </div>
            <p className={`pb-6 pt-0.5 text-sm italic text-red-400 ${!isvalidOnpress || !isValid ? 'opacity-100' : 'opacity-0'}`}>This URL is invalid</p>
        </div>
    );



    // // todo: Get picture from user & store in Firebase Storage
    // return (
    //     <div>
    //         <h1 className="text-lg leading-6 font-medium text-gray-900">Picture</h1>
    //         <p className="mt-1 text-sm text-gray-500">
    //             Picture of the food after it's complete.
    //         </p>
    //         <div className="mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
    //             <div className="space-y-1 text-center">
    //                 <svg
    //                     className="mx-auto h-12 w-12 text-gray-400"
    //                     stroke="currentColor"
    //                     fill="none"
    //                     viewBox="0 0 48 48"
    //                     aria-hidden="true"
    //                 >
    //                     <path
    //                         d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
    //                         strokeWidth={2}
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                     />
    //                 </svg>
    //                 <div className="flex text-sm text-gray-600">
    //                     <label
    //                         htmlFor="file-upload"
    //                         className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
    //                     >
    //                         <span>Upload a file</span>
    //                         <input
    //                             id="file-upload"
    //                             name="file-upload"
    //                             type="file"
    //                             className="sr-only"
    //                             // onChange={(e) => {
    //                             //   setPicture(e.target.files[0]);
    //                             // }}
    //                         />
    //                     </label>
    //                     <p className="pl-1">or drag and drop</p>
    //                 </div>
    //                 <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
    //             </div>
    //         </div>
    //     </div>
    // );
}
