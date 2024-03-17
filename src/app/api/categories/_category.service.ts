import { NextApiRequest, NextApiResponse } from "next";
import CategoriesModel from "../../../back-end/db/mongodb/entyties/categories/categories.entity";

// $$ PUT
export async function addNewCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const updated = await CategoriesModel.findOneAndUpdate(
    { name: req.query.name },
    { $push: { options: req.body.option } },
    { new: true }
  );
  console.log(updated);
  res.status(201).json(updated);
}

// $$ POST
export async function createNewCategory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, options = [], refs = {} } = req.body;

  const newCategory = await CategoriesModel.create({
    name,
    options: Array.isArray(options) ? options : [options],
    refs,
  });
  await newCategory.save();
  res.status(201).json(newCategory);
}

// $$ GET
export async function getAllCategories(_, res) {
  const allCategories = await CategoriesModel.find({});
  console.log(allCategories);
  res.status(200).json(allCategories); // Correctly use the res object to send the response
}
