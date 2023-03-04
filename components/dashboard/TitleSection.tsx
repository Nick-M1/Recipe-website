import React from 'react';
import Image from "next/image";

type Props = {
    titleText: string
    titleImg: string
    small: boolean
    withSideparagraph: boolean
}

export default function TitleSection({ titleText, titleImg, small, withSideparagraph }: Props) {
    return (
        <div className="flex flex-col w-full mb-2 lg:justify-between lg:flex-row">
            <div className="flex items-center group lg:max-w-xl mb-3">
                <a href="/" aria-label="Item" className="mr-3">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-50">
                        <Image src={titleImg} alt={''} width={40} height={40}/>
                    </div>
                </a>
                <h2 className={`font-bold leading-none text-gray-900 ${small ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>
                    <span className="inline-block mb-2">{titleText}</span>
                    <div className="h-1 ml-auto duration-300 origin-left transform bg-teal-600 scale-x-30 group-hover:scale-x-100"/>
                </h2>
            </div>
            { withSideparagraph &&
                <p className="w-full text-gray-600 lg:text-sm lg:max-w-md mb-5">
                    "Cooking is not difficult. Everyone has a taste, even if they don’t
                    realize it. Even if you’re not a great chef, there’s nothing to stop
                    you from understanding the difference between what tastes good and
                    what doesn’t."
                </p>
            }
        </div>
    );
}