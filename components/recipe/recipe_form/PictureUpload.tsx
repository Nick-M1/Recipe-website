'use client'
import {Dispatch, SetStateAction} from "react";
import Image from "next/image";
import {MinusIcon} from "@heroicons/react/24/solid";

type Props = {
    selectedPicture: File | null
    setSelectedPicture: Dispatch<SetStateAction<File | null>>

    isValid: boolean
}

export default function PictureUpload({ selectedPicture, setSelectedPicture, isValid }: Props) {

    return (
        <div>
            <h1 className={`text-lg leading-6 font-medium ${ !isValid && selectedPicture == null ? 'text-red-700 dark:text-red-500' : 'text-gray-900' }`}>
                Picture
            </h1>
            <p className={`mt-1 text-sm ${ !isValid && selectedPicture == null ? 'text-red-400 dark:text-red-500' : 'text-gray-500' }`}>
                Picture of the food after it's complete.
            </p>
            <div className="md:flex items-center justify-center w-full md:gap-x-2">

                {/* Image preview */}
                { selectedPicture == null
                    ? (
                        <div className='flex items-center justify-center w-full h-48 bg-gray-300 rounded md:w-[40rem] dark:bg-gray-700 my-1 my:py-0'>
                            <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/>
                            </svg>
                        </div>
                    )
                    : (
                        <div className='relative h-48 w-full md:w-[40rem] flex justify-center my-1 my:py-0'>
                            <Image src={URL.createObjectURL(selectedPicture)} alt={''} height={200} width={200} className='object-cover'/>
                        </div>
                    )
                }

                {/* Input file box */}
                <label htmlFor="dropzone-file"
                       className={`flex flex-col items-center justify-center w-full h-52 border-2  border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${ !isValid && selectedPicture == null ? 'border-red-300' : 'border-gray-300' }`}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className={`font-semibold mr-1 ${ !isValid && selectedPicture == null ? 'text-red-400 hover:text-red-600' : 'text-teal-500 hover:text-teal-600' }`}>
                                Click to upload
                            </span>
                            or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG or JPG
                        </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" accept="image/*"
                           onChange={(e) => {
                               if (e.target.files != null)
                                   setSelectedPicture(e.target.files[0])
                           }}
                    />
                </label>
            </div>

            <button
                onClick={() => setSelectedPicture(null)}
                type='button'
                className={`btn-tertiary group inline-flex items-center px-4 py-2 text-sm ${selectedPicture == null ? 'opacity-0' : 'opacity-100'}`}
                disabled={selectedPicture == null}
            >
                <MinusIcon
                    className="-ml-2 mr-1 h-5 w-5 text-gray-400 group-hover:fill-blue-600"
                    aria-hidden="true"
                />
                Remove
            </button>
        </div>
    );
}
