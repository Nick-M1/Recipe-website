import React from 'react';
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import {BsEnvelopeAt, BsGithub, BsInstagram, BsTwitter} from 'react-icons/bs';
import Link from "next/link";
import RecipeCard from "../recipe/search/RecipeCard";
import TitleSection from "../dashboard/TitleSection";

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
                    <TitleSection titleText={`${author.name}'s Recipes`} titleImg={'/ingredients.png'} small={false} withSideparagraph={false}/>
                    <RecipeCard recipesAndAuthors={recipesAndAuthors} quickview={true} user={user} flexGrid={true}/>
                </div>
            </section>
        </div>
    );
}