'use client'
import {XCircleIcon} from "@heroicons/react/24/solid";

type Props = {
    incorrectFields: boolean[]
    allFieldNames: string[]
}

export default function FormMissingitems({ incorrectFields, allFieldNames }: Props) {

    return (
        <div className="flex justify-center mb-4">
            <div className="w-full rounded-md bg-red-50 p-4 mt-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <XCircleIcon
                            className="h-5 w-5 text-red-400"
                            aria-hidden="true"
                        />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                            Please correct the following errors to fill out the form.
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                            <ul className="list-disc pl-5 space-y-1">
                                { allFieldNames.map( (name, idx) => (
                                    !incorrectFields[idx] && <li key={idx}>{name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
