import Link from "next/link";
import Image from "next/image";
import searchUrlBuilder from "../../lib/utils/searchUrlBuilder";

type Props = {
    categories: Category[]
}

export default function Landing({ categories }: Props) {
    return (
        <>
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                    <div>
                        <Link
                            href="/search"
                            className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-teal-600 hover:bg-teal-500 hover:shadow-sm smooth-transition"
                        >
                            Explore
                        </Link>
                    </div>
                    <h2 className="max-w-lg mb-6 text-3xl font-bold leading-none text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                      id="ea469ae8-e6ec-4aca-8875-fc402da4d16e"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                  >
                    <circle cx="1" cy="1" r=".7"/>
                  </pattern>
                </defs>
                <rect
                    fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)"
                    width="52"
                    height="24"
                />
              </svg>
              <span className="relative">Share</span>
            </span>{" "}
                        your recipes with the world.
                    </h2>
                    <p className="text-base text-gray-700 md:text-lg">
                        Like to try out new foods? Have a recipe that you would like to
                        share to the world? Great! Start your journey here ...
                    </p>
                </div>
                <div className="grid gap-8 row-gap-10 lg:grid-cols-2">
                    <div className="max-w-md sm:mx-auto sm:text-center">
                        <div
                            className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-50 sm:mx-auto sm:w-24 sm:h-24">
                            <svg
                                className="w-12 h-12 text-teal-800 sm:w-16 sm:h-16"
                                stroke="currentColor"
                                viewBox="0 0 52 52"
                            >
                                <polygon
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                />
                            </svg>
                        </div>
                        <h6 className="mb-3 text-xl font-bold leading-5">
                            Create a recipe
                        </h6>
                        <p className="mb-3 text-sm text-gray-900">
                            Mix together 1 large smile, 2 cups of sweetness and positivity , A
                            good sense of humour, 1 cup of self esteem AND a heart full of
                            love and share it to the world.
                        </p>
                    </div>
                    <div className="max-w-md sm:mx-auto sm:text-center">
                        <div
                            className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-50 sm:mx-auto sm:w-24 sm:h-24">
                            <svg
                                className="w-12 h-12 text-teal-800 sm:w-16 sm:h-16"
                                stroke="currentColor"
                                viewBox="0 0 52 52"
                            >
                                <polygon
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                />
                            </svg>
                        </div>
                        <h6 className="mb-3 text-xl font-bold leading-5">
                            Get other people's recipes
                        </h6>
                        <p className="mb-3 text-sm text-gray-900">
                            Food for us comes from our relatives, whether they have wings or
                            fins or roots. That is how we consider food. Food has a culture.
                            It has a history. It has a story. It has relationships. Discover
                            now!
                        </p>
                    </div>
                    <div className="max-w-md sm:mx-auto sm:text-center">
                        <div
                            className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-50 sm:mx-auto sm:w-24 sm:h-24">
                            <svg
                                className="w-12 h-12 text-teal-800 sm:w-16 sm:h-16"
                                stroke="currentColor"
                                viewBox="0 0 52 52"
                            >
                                <polygon
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                />
                            </svg>
                        </div>
                        <h6 className="mb-3 text-xl font-bold leading-5">Like a recipe</h6>
                        <p className="mb-3 text-sm text-gray-900">
                            This magical, marvelous food on our plate, this sustenance we
                            absorb, has a story to tell. It has a journey. It leaves a
                            footprint. It leaves a legacy.
                        </p>
                    </div>
                    <div className="max-w-md sm:mx-auto sm:text-center">
                        <div
                            className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-50 sm:mx-auto sm:w-24 sm:h-24">
                            <svg
                                className="w-12 h-12 text-teal-800 sm:w-16 sm:h-16"
                                stroke="currentColor"
                                viewBox="0 0 52 52"
                            >
                                <polygon
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                />
                            </svg>
                        </div>
                        <h6 className="mb-3 text-xl font-bold leading-5">Save a recipe</h6>
                        <p className="mb-3 text-sm text-gray-900">
                            Save your favorite recipes. A recipe has no soul. You as the cook
                            must bring soul to the recipe.
                        </p>
                    </div>
                </div>


                <section className='flex flex-col text-center justify-center overflow-x-clip pt-20'>
                    <h3 className='text-left md:text-center tracking-wide text-gray-800 text-3xl font-bold pb-6'> Categories </h3>

                    <div className='grid grid-cols-2 md:grid-cols-5 gap-5 pl-1 pr-1 md:pl-3'>
                        { categories.map( category => (
                            <Link
                                key={category.id}
                                href={searchUrlBuilder('', category.href)}
                                className='group flex flex-col justify-between items-center text-center cursor-pointer w-44 h-44 md:w-52 md:h-52 rounded-full border border-teal-400 bg-gray-50 hover:bg-gray-100 ring-2 ring-teal-500 hover:ring-4 shadow-md drop-shadow-md hover:drop-shadow-lg object-cover filter smooth-transition'
                            >
                                <Image src={category.img} alt={'category'} width={200} height={200} className='w-36 h-36 md:w-40 md:h-40 group-hover:animate-[wiggle_3s_ease-in-out_infinite]'/>
                                <p className='text-teal-700 font-semibold mb-2'>{ category.title }</p>
                            </Link>
                        ))}

                    </div>
                </section>

            </div>
        </>
    );
}
