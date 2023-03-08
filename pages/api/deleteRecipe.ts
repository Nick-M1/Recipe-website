// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {deleteDoc, doc, setDoc} from "@firebase/firestore";
import {db} from "../../firebase";
import {randomUUID} from "crypto";
import {getServerSession} from "next-auth";
import {authOptions} from "./auth/[...nextauth]";

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

    // Check auth signed in
    const sessionAuth = await getServerSession(req, res, authOptions)
    if (!sessionAuth)
        return res.status(401).send({ body: 'Unauthorised' })

    // Do update
    const recipeId = req.body.recipeId as string
    await deleteDoc(
        doc(db, 'recipes', recipeId),
    )

    res.status(200).json({ body: 'success' })
}
