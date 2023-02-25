'use client'
import {useState} from "react";
import QuickView from "./QuickView";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import BookmarkAndLikesHander from "../../interactive_components/BookmarkAndLikes/BookmarkAndLikesHander";

type Props = {
    recipesAndAuthors: RecipeAndAuthor[]
    quickview: boolean
    user: UserDB | null
}

export default function RecipeCard({recipesAndAuthors, quickview, user}: Props) {
    const [open, setOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeAndAuthor | null>(null);

    return (
        <>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {recipesAndAuthors.map(( recipeAndAuthor, index) => (
                    <div
                        key={index}
                        className="bg-white overflow-hidden shadow rounded-lg"
                    >
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="w-0 flex-1">
                                    <dl>
                                        <dt>
                                            <div>
                                                <Image
                                                    src={ recipeAndAuthor.recipe.imgSrc}
                                                    alt={ recipeAndAuthor.recipe.imgAlt}
                                                    width={300} height={300}
                                                    className="object-cover w-full h-48 display-img"
                                                />
                                            </div>
                                        </dt>
                                        <div className="mt-4 flex justify-between md:mt-2">
                                            <dt className="text-lg font-medium text-gray-500 truncate">
                                                { recipeAndAuthor.recipe.title}
                                            </dt>
                                            <dt className="text-xs font-light border border-gray-200 p-1 rounded-lg text-gray-500 truncate">
                                                by { recipeAndAuthor.author.name}
                                            </dt>
                                        </div>
                                        <dd>
                                            <ReactMarkdown className="text-sm text-gray-900 opacity-70">{ recipeAndAuthor.recipe.description}</ReactMarkdown>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between bg-gray-50 pl-5">
                            <div className="text-sm py-3">
                                {quickview ? (
                                    <button
                                        className="font-medium text-teal-700 hover:text-teal-900"
                                        onClick={() => {
                                            setOpen(true);
                                            setSelectedRecipe( recipeAndAuthor);
                                        }}
                                    >
                                        Quick View
                                    </button>
                                ) : (
                                    <Link
                                        href={`/recipe/${ recipeAndAuthor.recipe.id}`}
                                        className="font-medium text-teal-700 hover:text-teal-900"
                                    >
                                        View detail
                                    </Link>
                                )}
                            </div>

                            <div className='scale-90 -mt-1'>
                                <BookmarkAndLikesHander recipe={ recipeAndAuthor.recipe} user={user} showText={false}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination */}
            {/* <nav
        className="bg-white mt-10 px-4 pt-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">20</span> results
          </p>
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          <a
            href="/"
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="/"
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </a>
        </div>
      </nav> */}
            {open && <QuickView open={open} setOpen={setOpen} recipeAndAuthor={selectedRecipe!} user={user}/>}
        </>
    );
}
