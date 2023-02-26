import RecipeCard from "../recipe/search/RecipeCard";
import Image from "next/image";

type Props = {
    recipesAndAuthors: RecipeAndAuthor[]
    user: UserDB | null
}

export default function SavedRecipes({ recipesAndAuthors, user }: Props) {


    if (recipesAndAuthors.length == 0)
        return (
            <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-15">
                <p className="text-2xl text-center text-gray-700">
                    You have no bookmarked recipes :(
                </p>
            </div>
        );

    return (
        <>
            <div className="mt-8">
                <div className="px-4 md:px-6">

                    <div className="flex items-center mb-5 md:mb-6 group lg:max-w-xl">
                        <div aria-label="Item" className="mr-3">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-50">
                                <Image src={'/recipes-bookmarked.png'} alt={''} width={35} height={35}/>
                            </div>
                        </div>
                        <h2 className="font-sans text-2xl font-bold leading-none tracking-tight text-gray-900">
                            <span className="inline-block mb-2">Bookmarked Recipes</span>
                            <div className="h-1 ml-auto duration-300 origin-left transform bg-teal-600 scale-x-30 group-hover:scale-x-100"/>
                        </h2>
                    </div>

                    <RecipeCard recipesAndAuthors={recipesAndAuthors} user={user} quickview={false}/>
                </div>
            </div>
        </>
    );
}
