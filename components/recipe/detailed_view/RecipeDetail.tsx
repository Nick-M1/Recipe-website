import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import BookmarkAndLikes from "./BookmarkAndLikes";

type Props = {
    recipe: Recipe
    user: UserDB
}

export default function RecipeDetail({ recipe, user }: Props) {
    return (
        <>
            <div className="bg-white">
                <main className="max-w-7xl mx-auto sm:pt-16 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto lg:max-w-none">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                            <div className="flex flex-col-reverse">
                                <div className="px-2 md:px-0 w-full aspect-w-1 aspect-h-1">
                                    <div>
                                        <Image
                                            src={recipe.imgSrc}
                                            alt={recipe.imgAlt}
                                            width={1000}
                                            height={1000}
                                            priority
                                            className="w-full h-full object-center object-cover display-img"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Recipe info */}
                            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                                <div className="flex sm:flex-col1">
                                    <h1 className="flex text-3xl font-extrabold tracking-tight text-gray-900">
                                        {recipe.title}
                                    </h1>

                                    <Link href={`/recipe/${recipe.id}/edit/`}>
                                        <button
                                            type="button"
                                            className="group ml-4 px-3 py-1.5 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 smooth-transition"
                                        >
                                            <Image src={'/animations/edit-pencil.png'} alt={''} width={25} height={25} className='group-hover:hidden'/>
                                            <Image src={'/animations/edit-pencil.gif'} alt={''} width={25} height={25} className='hidden group-hover:block'/>
                                            <p className="hidden ml-2 group-hover:block text-sm smooth-transition">
                                                Edit Recipe
                                            </p>
                                        </button>
                                    </Link>
                                    <button
                                        type="button"
                                        className="group ml-1 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 smooth-transition"
                                        // onClick={() => setModal(true)}
                                    >
                                        <Image src={'/animations/trash-can.png'} alt={''} width={25} height={25} className='group-hover:hidden'/>
                                        <Image src={'/animations/trash-can.gif'} alt={''} width={25} height={25} className='hidden group-hover:block'/>
                                        <p className="hidden ml-2 group-hover:block text-sm smooth-transition">
                                            Delete Recipe
                                        </p>
                                    </button>
                                </div>

                                <div className="mt-3">
                                    <h2 className="sr-only">Recipe information</h2>
                                    <span
                                        className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-teal-600 ">
                                        {recipe.categories[0].title}
                                    </span>
                                </div>

                                <div className="mt-6">
                                    <h3 className="sr-only">Description</h3>
                                    <div className="text-base text-gray-700 space-y-6" >
                                        <ReactMarkdown>{recipe.description}</ReactMarkdown>
                                    </div>
                                </div>

                                <BookmarkAndLikes recipe={recipe} user={user}/>

                                <section aria-labelledby="details-heading" className="mt-8">
                                    <div className="border-t divide-gray-200 py-5">
                                        <p className='text-gray-600 font-semibold tracking-wide pb-1'>Ingredients:</p>
                                        <ol className="list-disc pl-6">
                                            {recipe.ingredients.map( (ingredient, idx) => (
                                                <li key={idx}>
                                                    <span className='flex py-0.5 font-normal text-gray-500'>
                                                        <Image src={ingredient.img} alt={'img'} width={20} height={20} className='mr-3'/>
                                                        {`${ingredient.amount} of ${ingredient.name}`}
                                                    </span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                </section>
                            </div>
                        </div>

                        <section aria-labelledby="related-heading" className="mt-10 border-t border-gray-200 py-7 px-4 sm:px-0" >
                            <h2 className="text-gray-600 font-semibold tracking-wide text-xl" > Directions 🗒️: </h2>
                            <ol className="">
                                {recipe.method.map( (methodItem, idx) => (
                                    <li key={idx} className='py-3'>
                                        <div className='flex gap-x-7'>
                                            <p className='bg-teal-300 w-9 h-9 py-1.5 rounded-full text-center text-white font-semibold'>{idx+1}</p>
                                            <p className='text-lg py-1 tracking-wide'> {methodItem.title} </p>
                                        </div>
                                        <span className='ml-16 flex py-0.5 font-normal text-gray-500'>
                                            <ReactMarkdown>{methodItem.description}</ReactMarkdown>
                                        </span>
                                        <div className='ml-16 md:flex relative gap-x-5 pt-3 pb-6'>
                                            { methodItem.imgs.map( (imgItem, imgIdx) => (
                                                <Image key={imgItem} src={imgItem} alt={''} width={250} height={250} className='py-1 md:py-0 aspect-video display-img' />
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </section>

                        {/*<section*/}
                        {/*    aria-labelledby="related-heading"*/}
                        {/*    className="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0"*/}
                        {/*>*/}
                        {/*    <h2*/}
                        {/*        id="related-heading"*/}
                        {/*        className="text-xl font-bold text-gray-900"*/}
                        {/*      >*/}
                        {/*        Other popular recipes*/}
                        {/*      </h2>*/}
                        {/*</section>*/}
                    </div>
                </main>
            </div>
            {/*{modal && <RecipeDelete modal={modal} setModal={setModal} id={recipe.id} />}*/}
        </>
    );
}
