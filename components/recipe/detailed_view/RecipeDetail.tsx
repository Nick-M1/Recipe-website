import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import BookmarkAndLikesHander from "../../interactive_components/BookmarkAndLikes/BookmarkAndLikesHander";
import RecipeDelete from "../../interactive_components/Popups/RecipeDelete";
import searchUrlBuilder from "../../../lib/utils/searchUrlBuilder";
import {dateFormatter} from "../../../lib/utils/time-formatter";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import CommentSection from "./comment_section/CommentSection";
import RecipeCardGrid from "../search/recipecard-layout/RecipeCardGrid";
import ProfilePopup from "../../profileview/ProfilePopup";
import SocialShare from "./SocialShare";

type Props = {
    recipe: Recipe
    recommendedRecipes: RecipeAndAuthor[]
    author: UserDB

    user: UserDB | null
    currentTime: number
}

const ONE_WEEK_UNIX = 604_800_000
export default function RecipeDetail({ recipe, recommendedRecipes, author, user, currentTime }: Props) {
    dayjs.extend(relativeTime)

    const isEditor = user != null && recipe.author == user.email

    const timeDisplayer: () => string = () => {
        const isEdited = recipe.created_at != recipe.edited_at
        const useRelativeTime = recipe.edited_at > (currentTime - ONE_WEEK_UNIX)

        return `${isEdited ? 'Edited:' : 'Created:'} ${useRelativeTime ? dayjs(recipe.edited_at).from(dayjs(currentTime)) : dateFormatter.format(recipe.edited_at)}`
    }

    return (
        <>
            <div className="bg-white">
                <main className="max-w-7xl mx-auto sm:pt-16 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto lg:max-w-none">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                            <div className="flex flex-col-reverse">
                                <div className="px-2 lg:px-0 ">

                                    <div className=''>
                                        <Image
                                            src={recipe.imgSrc}
                                            alt={recipe.imgAlt}
                                            width={1000}
                                            height={1000}
                                            priority
                                            className="object-cover display-img lg:max-h-[23rem]"
                                        />
                                    </div>

                                </div>
                            </div>

                            {/* Recipe info */}
                            <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                                <div className="flex sm:flex-col1">
                                    <h1 className="flex text-3xl font-extrabold text-gray-900">
                                        {recipe.title}
                                    </h1>

                                    { isEditor && (
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
                                    )}
                                    { isEditor && (
                                        <RecipeDelete recipe={recipe} user={user} />
                                    )}
                                </div>

                                <p className='text-gray-400 text-sm tracking-wide pb-2'>
                                    {timeDisplayer()}
                                </p>

                                <div className='pt-1 group max-w-screen-sm'>
                                    <Link href={`profile/${author.id}`} className='flex'>
                                        <Image src={author.pic} alt='profile-pic' width={70} height={70} className='rounded-full h-8 w-8' />
                                        <p className=" text-sm font-weight text-gray-500 truncate ml-2 my-auto group-hover:text-teal-500 smooth-transition">
                                            By {author.name}
                                        </p>
                                    </Link>
                                    <div className='hidden md:block md:opacity-0 md:hover:visible md:group-hover:opacity-100 md:hover:opacity-100 z-10 -translate-y-24 -translate-x-72 transition-opacity duration-300 ease-in-out'>
                                        <ProfilePopup author={author}/>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    { recipe.categories.map(category => (
                                        <Link key={category.id} href={searchUrlBuilder('', category.href)}
                                              className="inline-flex items-center px-3 py-0.5 mr-0.5 rounded-full text-sm font-medium bg-gray-100 text-teal-600 capitalize">
                                            {category.title}
                                        </Link>
                                    ))}
                                    { recipe.labels.map(labels => (
                                        <Link key={labels} href={'#'}
                                              className="inline-flex items-center px-3 py-0.5 mr-0.5 rounded-full text-sm font-medium bg-gray-100 text-teal-600 capitalize">
                                            {labels}
                                        </Link>
                                    ))}

                                </div>

                                <div className="mt-6">
                                    <h3 className="sr-only">Description</h3>
                                    <ReactMarkdown className="text-base text-gray-700 space-y-6">{recipe.description}</ReactMarkdown>
                                </div>

                                <BookmarkAndLikesHander recipe={recipe} user={user} showText={true} />

                                <div className='pt-4 pl-0.5'>
                                    <SocialShare
                                        urlToShare={`${process.env.NEXTAUTH_URL}/recipe/${recipe.id}`}
                                        mediaImg={recipe.imgSrc}
                                        quote={`Amazing ${recipe.title} Recipe!`}
                                        hashtag={'AmazingFood'}
                                    />
                                </div>

                                <section aria-labelledby="details-heading" className="mt-8">
                                    <div className="border-t divide-gray-200 py-5">
                                        <p className='text-gray-600 font-semibold tracking-wide pb-1'>Ingredients:</p>
                                        <ol className="list-disc pl-6">
                                            {recipe.ingredients.map( (ingredient, idx) => (
                                                <li key={idx}>
                                                    <span className='flex py-0.5 font-normal text-gray-500'>
                                                        <Image src={ingredient.img} alt={'img'} width={20} height={20} className='mr-3'/>
                                                        { ingredient.text }
                                                    </span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                </section>
                            </div>
                        </div>

                        <section aria-labelledby="related-heading" className="mt-10 border-t border-gray-200 pt-7 pb-14 px-4 sm:px-0" >
                            <h2 className="text-gray-600 font-semibold tracking-wide text-xl" > Directions 🗒️: </h2>
                            <ol className="">
                                {recipe.method.map( (methodItem, idx) => (
                                    <li key={idx} className='py-3'>
                                        <div className='flex gap-x-7'>
                                            <p className='bg-teal-300 w-9 h-9 py-1.5 rounded-full text-center text-white font-semibold'>{idx+1}</p>
                                            <p className='text-lg py-1 tracking-wide'> {methodItem.title} </p>
                                        </div>
                                            <ReactMarkdown className='ml-16 flex py-0.5 font-normal text-gray-500'>{methodItem.description}</ReactMarkdown>
                                        <div className='ml-16 md:flex relative gap-x-5 pt-3 pb-6'>
                                            { methodItem.imgs.map( (imgItem, imgIdx) => (
                                                <Image key={imgItem} src={imgItem} alt={''} width={250} height={250} className='py-1 md:py-0 aspect-video display-img' />
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </section>


                        <section
                            aria-labelledby="related-heading"
                            className="mt-10 border-t border-gray-200 py-8 px-4 sm:px-0 md:grid md:grid-cols-3 md:gap-5"
                        >
                            <div className='md:col-span-2'>
                                <h2 className="text-gray-600 font-semibold tracking-wide text-xl flex pb-2">
                                    Comments
                                    <Image src={'/comment-section.png'} alt='' width={50} height={50} className='h-7 w-7 mx-2'/> :
                                </h2>
                                <CommentSection recipeId={recipe.id} comments={recipe.comments} user={user}/>
                            </div>
                            <div className='mt-16 pt-7 border-t border-gray-200 md:mt-0 md:pt-0 md:border-t-0 md:pl-4'>
                                <h2 className="text-gray-600 font-semibold tracking-wide text-xl flex pb-2">
                                    Other popular recipes
                                <Image src={'/recommended-recipes.png'} alt='' width={50} height={50} className='h-7 w-7 mx-2'/> :
                            </h2>
                                <RecipeCardGrid recipesAndAuthors={recommendedRecipes} quickview={true} user={user} flexGrid={false}/>
                            </div>

                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}
