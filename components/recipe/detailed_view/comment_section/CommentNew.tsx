'use client'

import React, {useEffect, useState} from "react";
import {StarIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {classNames} from "../../../../lib/utils/textUtils";
import {useRouter} from "next/navigation";
import SpinnerComponent from "../../../interactive_components/SpinnerComponent";
import {signIn} from "next-auth/react";
import smoothScroll from "../../../../lib/utils/smooth-scroll";
import toast from "react-hot-toast";
import {toastOptionsCustom} from "../../../../lib/utils/toast-options-custom";

type Props = {
    recipeId: string
    user: UserDB | null
}

export default function CommentNew({ recipeId, user }: Props) {
    const [commentState, setCommentState] = useState('')
    const [starRating, setStarRating] = useState(5)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const handleSendComment = async () => {
        toast.loading('Uploading comment...', { ...toastOptionsCustom, id: 'comment' } )

        // Error detection
        if (user == null) {
            toast.error( 'You need to sign in before commenting', { id: 'comment' })
            return
        }
        if (commentState === '') {
            toast.error( 'Your comment should not be empty', { id: 'comment' })
            return
        }

        setIsLoading(true)

        const comment = {
            recipeId: recipeId,
            authorEmail: user.email,
            authorName: user.name,
            authorPic: user.pic,
            rating: starRating,
            comment: commentState,
            created_at: Date.now()
        } as CommentItem

        await fetch('/api/addComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipeId, comment})

        }).finally(() => {
            router.refresh()
            setTimeout(() => {
                setCommentState('')
                setIsLoading(false)
                toast.success( 'Comment uploaded successfully', { id: 'comment' })
                smoothScroll('post-comment-button', 'start')
            }, 1000)
        })
    }

    return (
        <div id='post-comment-button' className='px-1'>
            <h1 className="text-gray-500 review-title my-5 text-2xl">Your Review</h1>

            <h3>Rating</h3>
            <div className="mb-4 mt-3">
                <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <StarIcon
                            key={rating}
                            className={classNames(
                                starRating >= rating ? 'text-gray-900' : 'text-gray-200',
                                'h-5 w-5 flex-shrink-0 cursor-pointer'
                            )}
                            aria-hidden="true"
                            onClick={() => setStarRating(rating)}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-5">
                <label className="block"> Comments </label>
                <textarea
                    rows={4}
                    className='smooth-transition appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full'
                    placeholder="Enter your comments..."
                    name="description"
                    required
                    value={commentState}
                    onChange={(e) => setCommentState(e.target.value)}
                ></textarea>
            </div>

            <div className='flex'>
                <button onClick={handleSendComment}
                        className={`mb-5 px-6 py-2 text-center inline-block flex justify-center btn-secondary w-1/2 ${user == null ? 'cursor-not-allowed' : ''}`}
                >
                    <span className={isLoading ? 'block' : 'hidden'}><SpinnerComponent size={5}/></span>
                    Post Review
                </button>
                { user == null && (
                    <p className='mx-auto md:px-10 py-2'>
                        <button onClick={() => signIn()} className='text-indigo-600 hover:text-indigo-800 smooth-transition'>Sign in</button>
                        {' '} to comment
                    </p>
                )}
            </div>
            <hr className="my-4"/>
        </div>
    );
}