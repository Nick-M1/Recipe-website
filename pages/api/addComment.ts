import { NextApiRequest, NextApiResponse } from 'next'
import {arrayUnion, doc, setDoc, updateDoc} from "@firebase/firestore";
import {db} from "../../firebase";


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    const { recipeId, comment }: {recipeId: string, comment: CommentItem} = req.body

    await updateDoc(
        doc(db, 'recipes', recipeId),
        {
            comments: arrayUnion(
                { ...comment, created_at: Date.now() }
            )
        }

    ).finally(() => res.status(200).json({ body: 'success' }))

}

export default handler
