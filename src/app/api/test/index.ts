import dbConnect from "db/mongodb/connection";
import { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from "../../../back-end/db/mongodb/connection";
// import { handleMethods } from "../utils/_methods";
// import { addNewCategory, createNewCategory, getAllCategories } from "../categories/_category.service";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  // await handleMethods(req, res, {
  //   // * GET
  //   GET: {
  //     execute: getAllCategories,
  //   },

  //   // * POST
  //   POST: {
  //     execute: createNewCategory,
  //     // preCheck: 
  //   },

  //   // * PUT
  //   PUT: {
  //     execute: addNewCategory,
  //   },
  // });
}


// export default handler
export default handler;
