'use client'
import {useState, useEffect, SetStateAction, Dispatch} from "react";

type Props = {
    selectedCookTime: number
    setSelectedCookTime: Dispatch<SetStateAction<number>>
}

export default function TimePicker({selectedCookTime, setSelectedCookTime}: Props) {

    return (
        <div>
            <h1 className="text-lg leading-6 font-medium text-gray-900">Cook Time</h1>
            <p className="mt-1 text-sm text-gray-500">
                How long is it going to take to cook in minutes?
            </p>
            <div className="mt-1 block p-1 w-40 border-none">
                <input
                    type="number"
                    name="add-method-title"
                    id="add-method-title"
                    className="block shadow-sm p-3 mb-1 md:mb-0 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm border border-gray-300 rounded-md w-full"
                    placeholder="Enter method title"
                    aria-describedby="add-method-title"
                    value={selectedCookTime}
                    onChange={(e) => setSelectedCookTime( Number(e.target.value) )}
                />
            </div>
        </div>
    );
}
