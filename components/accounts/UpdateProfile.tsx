'use client'
import {useEffect, useState} from "react";
import {PencilIcon} from "@heroicons/react/24/solid";
import {doc, updateDoc} from "@firebase/firestore";
import {db} from "../../firebase";
import {useRouter} from "next/navigation";
import {checkImage} from "../../lib/utils/urlUtils";

type Prop = {
    user: UserDB
}

export default function UpdateProfile({ user }: Prop) {

    // todo: When email auth setup, let user change their password...

    // Input text
    const [displayname, setDisplayname] = useState( user.name );
    const [profilepic, setProfilepic]   = useState( user.pic );

    // Boolean id input text is valid
    const [checkerstarted, setCheckerstarted]     = useState( false );
    const [displaynameValid, setDisplaynameValid] = useState( true );
    const [profilepicValid, setProfilepicValid]   = useState( true );

    // Checking profile pic when text entered
    useEffect(() => {
        const checkImageHandler = async () => {
            setProfilepicValid(
                await checkImage(profilepic)
            )
            console.log(profilepicValid)
        }
        checkImageHandler()
    }, [profilepic])

    // Extras
    const router = useRouter();
    const userRef = doc(db, 'users', user.email)

    // Change display name button
    const handleDisplaynameChange = () => {
        if (displayname == '' || displayname.length < 3) {
            setDisplaynameValid(false)
            return
        }

        updateDoc(
            userRef,
            { name: displayname }

        ).finally(() => router.refresh())
    }

    // Change profile pic url button
    const handleProfilepicChange = async () => {
        setCheckerstarted(true)

        if (!(await checkImage(profilepic)))
            return

        updateDoc(
            userRef,
            { pic: profilepic }

        ).finally(() => router.refresh())
    }

    return (
        <div className='mt-8 px-4 md:px-9'>
            <div className="">
                <div className="max-w-6xl">
                    <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Update Profile
                    </h2>
                    <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="">

                            {/* todo: Upload profile pics to DB Firebase Store - use 'PictureUpload' component */}
                            {/*<div className="flex items-center">*/}
                            {/*    <label htmlFor="picture" className="relative cursor-pointer">*/}
                            {/*        <img*/}
                            {/*            className="h-16 w-16 rounded-full block"*/}
                            {/*            src={user.pic}*/}
                            {/*            alt=""*/}
                            {/*        />*/}
                            {/*        <input*/}
                            {/*            id="picture"*/}
                            {/*            name="picture"*/}
                            {/*            type="file"*/}
                            {/*            className="sr-only"*/}
                            {/*            // onChange={(e) => {*/}
                            {/*            //     setPicture(e.target.files[0]);*/}
                            {/*            // }}*/}
                            {/*        />*/}
                            {/*    </label>*/}
                            {/*    <div>*/}
                            {/*        <button*/}
                            {/*            type="button"*/}
                            {/*            className="ml-2 bg-white py-2 px-2 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"*/}
                            {/*            // onClick={handleAvatarChange}*/}
                            {/*        >*/}
                            {/*            Change*/}
                            {/*        </button>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <div className="sm:flex">
                                <label htmlFor="displayname" className="sr-only">
                                    Displayname
                                </label>
                                <input
                                    id="displayname"
                                    name="displayname"
                                    type="text"
                                    autoComplete="displayname"
                                    required
                                    className={`appearance-none p-2.5 relative block w-full input-secondary md:mr-3 ${displayname.length > 3 ? '' : 'input-secondary-invalid' }`}
                                    placeholder="New display name"
                                    defaultValue={displayname}
                                    onChange={(e) => setDisplayname(e.target.value)}
                                />
                                <p className={`sm:hidden text-sm italic text-red-400 ${displayname.length < 4 ? 'block opacity-100' : 'hidden opacity-0'}`}>Display name must be longer than 4 characters</p>

                                <button
                                    type="button"
                                    className="btn-tertiary text-sm inline-flex justify-center mt-2 md:mt-0 px-4 py-2.5"
                                    onClick={() => handleDisplaynameChange()}
                                >
                                    <PencilIcon
                                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    <span>Update</span>
                                </button>
                            </div>
                            <p className={`hidden text-sm italic text-red-400 ${displayname.length < 4 ? 'sm:block' : 'sm:hidden'}`}>Display name must be longer than 3 characters</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="mt-8">
                <div className="max-w-6xl">
                    <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Change Profile Picture
                    </h2>
                    <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="">
                            <div className="sm:flex">
                                <label htmlFor="opassword" className="sr-only">
                                    Profile pic url
                                </label>
                                <input
                                    id="profilepic"
                                    name="profilepic"
                                    type="text"
                                    required
                                    className={`appearance-none p-2.5 relative block w-full input-secondary md:mr-3 ${profilepicValid || !checkerstarted ? '' : 'input-secondary-invalid' }`}
                                    placeholder="New profile-pic url"
                                    defaultValue={profilepic}
                                    onChange={(e) => setProfilepic(e.target.value)}
                                />
                                <p className={`sm:hidden text-sm italic text-red-400 ${profilepicValid || !checkerstarted ? 'hidden opacity-0' : 'block opacity-100'}`}>Please enter a valid URL</p>

                                <button
                                    type="button"
                                    className="btn-tertiary text-sm inline-flex justify-center mt-2 md:mt-0 px-4 py-2.5"
                                    onClick={() => handleProfilepicChange()}
                                >
                                    <PencilIcon
                                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    <span>Update</span>
                                </button>
                            </div>
                            <p className={`hidden text-sm italic text-red-400 ${profilepicValid || !checkerstarted ? 'sm:hidden' : 'sm:block'}`}>Please enter a valid URL</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
