// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {deleteDoc, doc, setDoc} from "@firebase/firestore";
import {db} from "../../firebase";
import {randomUUID} from "crypto";

type Data = {
    recipeId: string
}

type ErrorData = {
    body: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrorData>
) {

    if (req.method !== 'DELETE') {
        res.status(405).json({body: 'Method not allowed'})
        return
    }

    const recipeId = req.body.recipeId as string
    await deleteDoc(
        doc(db, 'recipes', recipeId),
    )

    res.status(200).json({ body: 'success' })
}
