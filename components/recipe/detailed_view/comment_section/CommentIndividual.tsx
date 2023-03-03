import React from 'react';
import StarRating from "../../../interactive_components/StarRating";
import {dateFormatter} from "../../../../lib/utils/time-formatter";
import Image from "next/image";

export default function CommentIndividual({ comment }: {comment: CommentItem}) {
    const dateFormatted = dateFormatter.format(
        new Date(comment.created_at)
    )

    return (
        <div className="gap-4">
            <article className="block p-6 bg-white w-full rounded-lg border border-gray-200 shadow-sm mb-5">
                <div className="flex items-center mb-4 space-x-4">
                    <Image
                        className="w-10 h-10 rounded-full"
                        src={comment.authorPic}
                        alt="user"
                        width={200} height={200}
                    />
                    <div className="space-y-1 font-medium">
                        <p>
                            {comment.authorName}
                            <time className="block text-sm text-gray-500 dark:text-gray-400">
                                {dateFormatted}
                            </time>
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center space-x-2 mb-2 -ml-0.5">
                    <StarRating rating={comment.rating} color={'text-yellow-300'}/>
                </div>

                <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
                    {comment.comment}
                </p>
            </article>
        </div>
    );
}