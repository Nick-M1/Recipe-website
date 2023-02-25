import BookmarkAndLikesNotsignedin from "./BookmarkAndLikesNotsignedin";
import BookmarkAndLikesSignedin from "./BookmarkAndLikesSignedin";

type Props = {
    recipe: Recipe
    user: UserDB | null
    showText: boolean
}

export default function BookmarkAndLikesHander({ recipe, user, showText }: Props) {
    return user == null
        ? <BookmarkAndLikesNotsignedin recipe={recipe} showText={showText} />
        : <BookmarkAndLikesSignedin recipe={recipe} user={user} showText={showText}/>
}