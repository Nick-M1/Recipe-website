'use client'
import {useState, useEffect, SetStateAction, Dispatch, ChangeEvent} from "react";

type Props = {
    selectedCookTime: number
    setSelectedCookTime: Dispatch<SetStateAction<number>>
}


const MIN_RANGE = 1
const MAX_RANGE = 360

export default function TimePicker({selectedCookTime, setSelectedCookTime}: Props) {

    const setSelectedCookTimeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const eNum = Number(e.target.value)
        if (MIN_RANGE <= eNum && eNum <= MAX_RANGE)
            setSelectedCookTime( eNum )
    }

    return (
        <div>
            <h1 className="text-lg leading-6 font-medium text-gray-900">Cook Time</h1>
            <p className="mt-1 text-sm text-gray-500">
                How long is it going to take to cook in minutes?
            </p>
            <div className="mt-1 block p-1 w-40 border-none">
                <input
                    type="number"
                    min={MIN_RANGE} max={MAX_RANGE}
                    name="add-method-title"
                    id="add-method-title"
                    className="input-secondary block p-3 mb-1 md:mb-0 w-full"
                    placeholder="Enter method title"
                    aria-describedby="add-method-title"
                    value={selectedCookTime}
                    onChange={(e) => setSelectedCookTimeHandler(e)}
                />
            </div>
        </div>
    );
}
