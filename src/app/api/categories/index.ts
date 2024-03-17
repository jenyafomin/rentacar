import { NextApiRequest, NextApiResponse } from "next";
import { handleMethods } from "../utils/_methods";
import { addNewCategory, createNewCategory, getAllCategories } from "./_category.service";
import { checkCategoryPost } from "./_category.dto";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    return await handleMethods(req, res, {
        GET: {
            execute: getAllCategories
        },
        POST: {
            dto: checkCategoryPost,
            execute: createNewCategory
        },
        PUT: {execute: addNewCategory}
    }, {useMongo: true})
}