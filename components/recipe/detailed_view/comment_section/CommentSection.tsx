import CommentIndividual from "./CommentIndividual";
import CommentNew from "./CommentNew";

type Prop = {
    recipeId: string
    comments: CommentItem[]
    user: UserDB | null
}

export default function CommentSection({ recipeId, comments, user }: Prop) {

    return (
        <div className="w-full">
            <div className="mx-auto w-full rounded-2xl bg-white">
                <div className="md:overflow-y-auto scrollbar md:pr-4 pt-2 md:max-h-[1150px]">
                    <CommentNew recipeId={recipeId} user={user}/>
                    { comments?.reverse().map((comment) =>
                        <CommentIndividual comment={comment} key={comment.created_at}/>
                    )}
                </div>
            </div>
        </div>
    )
}