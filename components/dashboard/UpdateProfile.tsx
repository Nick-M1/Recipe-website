'use client'
import {useEffect, useState} from "react";
import {PencilIcon, CameraIcon} from "@heroicons/react/24/solid";
import {doc, updateDoc} from "@firebase/firestore";
import {db, storage} from "../../firebase";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import SpinnerComponent from "../interactive_components/SpinnerComponent";
import toast from "react-hot-toast";
import {toastOptionsCustom} from "../../lib/utils/toast-options-custom";

type Prop = {
    user: UserDB
}

export default function UpdateProfile({user}: Prop) {

    // todo: When email auth setup, let user change their password...

    // Input text
    const [displayname, setDisplayname] = useState(user.name);
    const [profilepic, setProfilepic] = useState<File | string>(user.pic);

    // When waiting for spinner
    const [displaynameIsloading, setDisplaynameIsloading] = useState(false);
    const [profilepicIsloading, setProfilepicIsloading] = useState(false);


    // Extras
    const router = useRouter();
    const userRef = doc(db, 'users', user.email)

    // Change display name button
    const handleDisplaynameChange = () => {
        toast.loading('Updating display name...', { ...toastOptionsCustom, id: 'displayname' } )

        if (displayname == '' || displayname.length < 3) {
            toast.error('Display name too short', { id: 'displayname' })
            return
        }
        setDisplaynameIsloading(true)



        updateDoc(
            userRef,
            {name: displayname}
        ).finally(() => {
            router.refresh()

            setTimeout(() => {
                setDisplaynameIsloading(false)
                toast.success('Display name updated successfully', { id: 'displayname' })
            }, 700)
        })
    }

    // Change profile pic url button
    const handleProfilepicChange = async () => {
        toast.loading('Updating profile pic...', { ...toastOptionsCustom, id: 'profilepic' } )

        if (typeof profilepic == 'string') {
            toast.error('No profile pic selected', { id: 'profilepic' })
            return
        }


        setProfilepicIsloading(true)

        // Upload picture to Firebase Storage
        const storageRef = ref(storage, `users/profilepic/${user.email}`)
        const uploadTask = uploadBytesResumable(storageRef, profilepic);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
            },
            (err) => {
                console.log(err)
                toast.error('Profile pic upload failed', { id: 'profilepic' })
                setProfilepicIsloading(false)
            },

            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    uploadToFirebase(url)
                });
            }
        );

        // Upload recipe to Firebase Cloud
        const uploadToFirebase = async (mainpicUrl: string) => {
            updateDoc(
                userRef,
                {pic: mainpicUrl}
            ).finally(() => {
                router.refresh()

                setTimeout(() => {
                    setProfilepicIsloading(false)
                    toast.success('Profile pic updated successfully', { id: 'profilepic' })
                }, 1000)
            })
        }
    }

    return (
        <div className='px-4 md:px-9'>

            <h1 className="py-4 text-xl leading-6 font-medium text-gray-900">
                Update Profile
            </h1>

            {/* DISPLAY NAME */}
            <div className="">
                <div className="max-w-6xl">
                    <h2 className="text-md leading-6 font-medium text-gray-900">
                        Update Profile Display Name
                    </h2>
                    <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="">

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
                                    className={`appearance-none p-2.5 relative block w-full input-secondary md:mr-3 ${displayname.length > 3 ? '' : 'input-secondary-invalid'}`}
                                    placeholder="New display name"
                                    defaultValue={displayname}
                                    onChange={(e) => setDisplayname(e.target.value)}
                                />
                                <p className={`sm:hidden text-sm italic text-red-400 ${displayname.length < 4 ? 'block opacity-100' : 'hidden opacity-0'}`}>Display
                                    name must be longer than 4 characters</p>

                                <button
                                    type="button"
                                    className="btn-tertiary group text-sm inline-flex justify-center mt-2 md:mt-0 px-4 py-2.5"
                                    onClick={() => handleDisplaynameChange()}
                                >
                                    {displaynameIsloading
                                        ? <div className="-ml-1"><SpinnerComponent size={5}/></div>
                                        : (
                                            <PencilIcon
                                                className="-ml-1 mr-2 h-5 w-5 text-gray-400 group-hover:fill-gray-500"
                                                aria-hidden="true"
                                            />
                                        )
                                    }
                                    <span>Update</span>
                                </button>
                            </div>
                            <p className={`hidden text-sm italic text-red-400 ${displayname.length < 4 ? 'sm:block' : 'sm:hidden'}`}>Display
                                name must be longer than 3 characters</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* PROFILE PIC */}
            <div className="mt-8">
                <div className="max-w-6xl">
                    <h2 className="text-md leading-6 font-medium text-gray-900">
                        Change Profile Picture
                    </h2>
                    <div className="mt-2 grid md:grid-cols-2 gap-5">
                        <div className="">
                            <div className="flex">

                                <label htmlFor="picture" className="relative cursor-pointer">
                                    <Image
                                        className="h-20 w-20 rounded-full block"
                                        height={300} width={300}
                                        src={
                                            typeof profilepic == 'string' ? profilepic : URL.createObjectURL(profilepic)
                                        }
                                        alt=""
                                    />
                                    <div className='absolute -top-1 -right-1 bg-teal-400 border border-black h-5 w-5 rounded-full text-white text-lg font-semibold flex justify-center items-center'>+</div>
                                    <input
                                        id="picture"
                                        name="picture"
                                        type="file"
                                        className="sr-only"
                                        onChange={(e) => {
                                            if (e.target.files != null && e.target.files[0].type.split('/')[0] == 'image')
                                                setProfilepic(e.target.files[0])
                                        }}
                                    />
                                </label>
                                <div className='mt-4'>
                                    <button
                                        type="button"
                                        className="group ml-4 btn-tertiary text-sm inline-flex justify-center mt-2 md:mt-0 px-4 py-2.5"
                                        onClick={() => handleProfilepicChange()}
                                    >
                                        {profilepicIsloading
                                            ? <div className="-ml-1"><SpinnerComponent size={5}/></div>
                                            : (
                                                <CameraIcon
                                                    className="-ml-1 mr-2 h-5 w-5 text-gray-400 group-hover:fill-gray-500"
                                                    aria-hidden="true"
                                                />
                                            )
                                        }
                                        <span>Update</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
