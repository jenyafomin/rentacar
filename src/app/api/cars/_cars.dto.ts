import { ECarType } from "../../../types/enum/ECarType";

export async function createCarDto (req, res) {
    const {make, model, year, color, type} = req.body;
    if(!make || !model || !year || !color || !type) {
      console.log(`[Cars create preCheck]:`,req.body)
      return {code: 403, message: `Missing required fields [mark, model, year, color, type]`}
    }

    for(const carType in ECarType) {
      console.log("carType", carType)
    }
  }