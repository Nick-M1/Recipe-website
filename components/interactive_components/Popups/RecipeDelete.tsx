'use client'
import {useState} from "react";
import {ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import Image from "next/image";
import {useRouter} from "next/navigation";
import PopupCustom from "./PopupCustom";

type Props = {
    recipe: Recipe
    user: UserDB | null
}

export default function RecipeDelete({ recipe, user }: Props) {
    const [modal, setModal] = useState(false)

    const router = useRouter();

    const handleRecipeDelete = async () => {
        if (recipe.author != user?.email)          //todo: check all & popup
            router.refresh()

        const res = await fetch(
            '/api/deleteRecipe',
            // '/api/recipe',
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipeId: recipe.id
                })
            }
        )
        const resData = await res.json()
        console.log(resData)

        if (resData.body == 'method not allowed')
            return          //todo tell user there is an error

        router.push(`/`)
    };

    return (
        <>
            <button
                type="button"
                className="group ml-1 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 smooth-transition"
                onClick={() => setModal(true)}
            >
                <Image src={'/animations/trash-can.png'} alt={''} width={25} height={25} className='group-hover:hidden'/>
                <Image src={'/animations/trash-can.gif'} alt={''} width={25} height={25} className='hidden group-hover:block'/>
                <p className="hidden ml-2 group-hover:block text-sm smooth-transition">
                    Delete Recipe
                </p>
            </button>

            <PopupCustom
                modal={modal}
                setModal={setModal}
                confirmHandler={handleRecipeDelete}
                titleText={'Delete this recipe'}
                descriptionText={'Are you sure you want to delete this recipe? 😥'}
                buttonText={'Delete'}
                IconImg={ExclamationTriangleIcon}
            />
        </>
    );
}
