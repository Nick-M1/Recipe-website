import { SetStateAction, Dispatch} from "react";
import {RadioGroup} from "@headlessui/react";
import {CheckCircleIcon} from "@heroicons/react/24/solid";
import {classNames} from "../../../lib/utils/textUtils";
import Image from "next/image";

type Props = {
    allCategories: Category[]
    selectedCategory: Category
    setSelectedCategory: Dispatch<SetStateAction<Category>>
    isValid: boolean
}

export default function CategorySelector({allCategories, selectedCategory, setSelectedCategory, isValid}: Props) {
    return (
        <RadioGroup value={selectedCategory} onChange={setSelectedCategory}>
            <RadioGroup.Label className="text-lg leading-6 font-medium text-gray-900">
                Select a food category
            </RadioGroup.Label>

            <div className="mt-4 grid grid-cols-1 gap-y-2 sm:grid-cols-3 sm:gap-x-4">
                {allCategories.map((category) => (
                    <RadioGroup.Option
                        key={category.id}
                        value={category}
                        className={({checked, active}) =>
                            classNames(
                                checked ? "border-transparent bg-gray-50 hover:bg-gray-100" : "border-gray-300 bg-white hover:bg-gray-50",
                                active ? "ring-2 ring-teal-500 " : "",
                                "relative border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none smooth-transition"
                            )
                        }
                    >
                        {({checked, active}) => (
                            <>
                                <div className="flex-1 flex">
                                    <div className="flex flex-col">
                                        <RadioGroup.Label
                                            as="span"
                                            className="block text-sm font-medium text-gray-900"
                                        >
                                            {category.title}
                                        </RadioGroup.Label>
                                        <RadioGroup.Description
                                            as="span"
                                            className="mt-1 flex items-center text-sm text-gray-500"
                                        >
                                            <div
                                                className="flex h-10 w-10 shrink-0 sm:h-12 sm:w-12 mr-4">
                                                <Image src={category.img} alt={category.title} width={100} height={100} aria-hidden="true"/>
                                            </div>
                                            {category.description}
                                        </RadioGroup.Description>
                                    </div>
                                </div>
                                <CheckCircleIcon
                                    className={classNames(
                                        !checked ? "invisible" : "",
                                        "h-5 w-5 text-teal-600"
                                    )}
                                    aria-hidden="true"
                                />
                                <div
                                    className={classNames(
                                        active ? "border" : "border-2",
                                        checked ? "border-teal-500" : "border-transparent",
                                        "absolute -inset-px rounded-lg pointer-events-none smooth-transition"
                                    )}
                                    aria-hidden="true"
                                />
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
}
