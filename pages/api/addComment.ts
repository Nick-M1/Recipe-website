import { NextApiRequest, NextApiResponse } from 'next'
import {arrayUnion, doc, setDoc, updateDoc} from "@firebase/firestore";
import {db} from "../../firebase";
import {getServerSession} from "next-auth";
import {authOptions} from "./auth/[...nextauth]";


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {

    // Check if correct method
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    // Check auth signed in
    const sessionAuth = await getServerSession(req, res, authOptions)
    if (!sessionAuth)
        return res.status(401).send({ message: 'Unauthorised' })

    // Do update
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
