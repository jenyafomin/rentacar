import CategoriesModel from "./categories.entity";


export async function createCategorie(name: string, options: string | Array<string>) {
    const categories = await CategoriesModel.create({
        name,
        options: Array.isArray(options) ? options : [options]
      })

    return categories
}