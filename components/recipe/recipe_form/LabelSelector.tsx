'use client'

import {Listbox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon, XMarkIcon} from '@heroicons/react/20/solid'
import {Dispatch, Fragment, SetStateAction, useState} from "react";
import {classNames} from "../../../lib/utils/textUtils";

type Props = {
    allLabels: string[]
    selectedlabels: string[]
    setSelectedlabels: Dispatch<SetStateAction<string[]>>
    isValid: boolean
}

export default function LabelSelector({ allLabels, selectedlabels, setSelectedlabels, isValid }: Props) {

    return (
        <div className="w-full0">
            <div className="space-y-1">
                <Listbox value={selectedlabels} onChange={setSelectedlabels} name="labels" multiple>
                    <Listbox.Label className={`block text-lg leading-6 font-medium ${ isValid || selectedlabels.length != 0 ? 'text-gray-900' : 'text-red-700 dark:text-red-500' }`}>
                        Select labels
                        <p className={`mt-1 mb-1.5 text-sm ${ isValid || selectedlabels.length != 0 ? 'text-gray-500' : 'text-red-400 dark:text-red-500' }`}>
                            Select labels which will show up when others search for this recipe
                        </p>
                    </Listbox.Label>

                    <div className="relative z-10">
                        <span className="inline-block w-full rounded-md">
                            <Listbox.Button
                                className={`relative w-full cursor-default py-2.5 pl-2 pr-10 text-left text-sm leading-5 smooth-transition input-secondary ${isValid || selectedlabels.length != 0 ? '' : 'input-secondary-invalid' }`}>
                                <span className="block flex flex-wrap gap-2 ">
                                    { selectedlabels.length === 0
                                        ? <span className={`px-0.5 pl-1 ${isValid || selectedlabels.length != 0 ? 'text-gray-400' : 'text-red-700/75'}`}>Empty</span>
                                        : ( selectedlabels.map((label) => (
                                            <span
                                                key={label}
                                                className="flex items-center gap-1 rounded bg-emerald-50 px-2.5 pl-2 py-0.5 capitalize"
                                            >
                                                <span>{label}</span>
                                                <XMarkIcon
                                                    className="h-4 w-4 cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        e.preventDefault()
                                                        setSelectedlabels((existing) => existing.filter((p) => p !== label))
                                                    }}
                                                />
                                            </span>
                                        ))
                                    )}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                        </span>

                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >

                            <div className="absolute mt-1 w-full rounded-md bg-white">
                                <Listbox.Options
                                    className=" shadow-md drop-shadow-md scrollbar max-h-60 overflow-auto rounded-md py-1 text-base focus:outline-none text-sm leading-5">
                                    {allLabels.map((label) => (
                                        <Listbox.Option
                                            key={label}
                                            value={label}
                                            className={({active}) => {
                                                return classNames(
                                                    'relative cursor-pointer capitalize select-none py-2 pl-7 pr-4 focus:outline-none smooth-transition',
                                                    active ? 'bg-teal-400/40 text-teal-900' : 'text-gray-900'
                                                )
                                            }}
                                        >
                                            {({active, selected}) => (
                                                <>
                                              <span
                                                  className={classNames(
                                                      'block truncate',
                                                      selected ? 'font-semibold' : 'font-normal smooth-transition'
                                                  )}
                                              >
                                                {label}
                                              </span>
                                                    {selected && (
                                                        <span
                                                            className={classNames(
                                                                'absolute inset-y-0 right-0 flex items-center pr-3 smooth-transition',
                                                                active ? 'text-teal-700' : 'text-teal-400'
                                                            )}
                                                        >
                                                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </div>
                        </Transition>
                    </div>
                </Listbox>
            </div>
            <p className={`text-sm italic text-red-400 mt-1 ${isValid || selectedlabels.length != 0 ? 'hidden' : 'block'}`}>Please add at least 1 label</p>
        </div>
    )


    // const [selected, setSelected] = useState(allLabels[0])
    //
    // return (
    //     <div className="fixed top-16 w-72">
    //         <Listbox value={selected} onChange={setSelected}>
    //             <div className="relative mt-1">
    //                 <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
    //                     <span className="block truncate">{selected}</span>
    //                     <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
    //           <ChevronUpDownIcon
    //               className="h-5 w-5 text-gray-400"
    //               aria-hidden="true"
    //           />
    //         </span>
    //                 </Listbox.Button>
    //                 <Transition
    //                     as={Fragment}
    //                     leave="transition ease-in duration-100"
    //                     leaveFrom="opacity-100"
    //                     leaveTo="opacity-0"
    //                 >
    //                     <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
    //                         {allLabels.map((label, labelIdx) => (
    //                             <Listbox.Option
    //                                 key={label}
    //                                 className={({ active }) =>
    //                                     `relative cursor-default select-none py-2 pl-10 pr-4 ${
    //                                         active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
    //                                     }`
    //                                 }
    //                                 value={label}
    //                             >
    //                                 {({ selected }) => (
    //                                     <>
    //                   <span
    //                       className={`block truncate ${
    //                           selected ? 'font-medium' : 'font-normal'
    //                       }`}
    //                   >
    //                     {label}
    //                   </span>
    //                                         {selected ? (
    //                                             <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
    //                       <CheckIcon className="h-5 w-5" aria-hidden="true" />
    //                     </span>
    //                                         ) : null}
    //                                     </>
    //                                 )}
    //                             </Listbox.Option>
    //                         ))}
    //                     </Listbox.Options>
    //                 </Transition>
    //             </div>
    //         </Listbox>
    //     </div>
    // )
}