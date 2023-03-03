import React from 'react';
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import {BsEnvelopeAt, BsGithub, BsInstagram, BsTwitter} from 'react-icons/bs';
import Link from "next/link";
import RecipeCard from "../recipe/search/RecipeCard";

type Props = {
    user: UserDB | null
    author: UserDB
    recipesAndAuthors: RecipeAndAuthor[]
}

const socialIcons = [
    BsGithub,
    BsInstagram,
    BsTwitter,
    BsEnvelopeAt
]

export default function UserProfile({ user, author, recipesAndAuthors }: Props) {
    return (
        <div>
            <section>
                <div className="p-6 sm:p-12 md:px-48 bg-gray-50 text-gray-800">
                    <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                        <Image
                            src={author.pic}
                            alt=""
                            className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start bg-gray-500 border-gray-300"
                            width={300} height={300}
                        />
                        <div className="flex flex-col">
                            <h4 className="text-lg font-semibold text-center md:text-left">{ author.name }</h4>
                            <ReactMarkdown className="text-gray-500 line-clamp-4">{ author.biography }</ReactMarkdown>
                        </div>
                    </div>
                    <div className="flex justify-center pt-4 space-x-4 align-center">
                        { socialIcons.map( (SocialIcon, idx) => (
                            <Link href="#" key={idx} className="p-2 rounded-md text-gray-800 hover:text-indigo-600 smooth-transition">
                                <SocialIcon className='h-5 w-5'/>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <div className="px-4 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-14">
                    <div className="flex flex-col w-full mb-2 lg:justify-between lg:flex-row">
                        <div className="flex items-center group lg:max-w-xl mb-3">
                            <a href="/" aria-label="Item" className="mr-3">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-teal-50">
                                    <Image src={'/ingredients.png'} alt={''} width={40} height={40}/>
                                </div>
                            </a>
                            <h2 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl">
                                <span className="inline-block mb-2">{author.name}'s Recipes</span>
                                <div
                                    className="h-1 ml-auto duration-300 origin-left transform bg-teal-600 scale-x-30 group-hover:scale-x-100"/>
                            </h2>
                        </div>
                    </div>

                    <RecipeCard recipesAndAuthors={recipesAndAuthors} quickview={true} user={user} flexGrid={true}/>

                </div>
            </section>
        </div>
    );
}