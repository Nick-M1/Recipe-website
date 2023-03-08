// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {doc, serverTimestamp, setDoc} from "@firebase/firestore";
import {db} from "../../firebase";
import {randomUUID} from "crypto";
import {getServerSession} from "next-auth";
import {authOptions} from "./auth/[...nextauth]";

type Data = {
    newRecipe: Recipe
}

type ErrorData = {
    body: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrorData>
) {

    if (req.method !== 'POST') {
        res.status(405).json({body: 'Method not allowed'})
        return
    }

    // Check auth signed in
    const sessionAuth = await getServerSession(req, res, authOptions)
    if (!sessionAuth)
        return res.status(401).send({ body: 'Unauthorised' })

    // Do update
    const recipe = req.body.newRecipe as Recipe
    const newId = randomUUID()
    const currentTime = Date.now()

    await setDoc(
        doc(db, 'recipes', newId),
        {
            ...recipe,
            id: newId,
            numberOfLikes: 0,
            numberOfBookmarks: 0,
            created_at: currentTime,
            edited_at: currentTime,
            comments: []
        }

    ).finally(() => res.status(200).json({ body: newId }))
}
