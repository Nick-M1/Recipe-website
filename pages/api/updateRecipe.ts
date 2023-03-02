// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {doc, setDoc} from "@firebase/firestore";
import {db} from "../../firebase";
import {randomUUID} from "crypto";

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

    if (req.method !== 'PUT') {
        res.status(405).json({body: 'Method not allowed'})
        return
    }

    const recipe = req.body.newRecipe as Recipe

    await setDoc(
        doc(db, 'recipes', recipe.id),
        { ...recipe, edited_at: Date.now()}

    ).finally(() =>
        res.status(200).json({ body: recipe.id }))
}
