import { post, pre, prop, getModelForClass } from "@typegoose/typegoose";

class CarCategories {
  @prop({type: () => [String], default: []})
  public makes: string[];

  @prop({type: () => [String], default: []})
  public models: string[]

  @prop({type: () => [String], default: {}})
  makeToModels: Map<string, string[]>

  @prop({type: () => [String], default: []})
  public features?: string[];

  @prop({type: () => [String], default: []})
  public types?: string[];
}

class Categories {
  @prop({type: () => String, unique: true, required: true, lowercase: true})
  name: string;

  @prop({type: () => [String], default: []})
  options?: string[];

  @prop({type: () => Map})
  refs?: Map<string, Array<string>>;

  // public set add({})
}

const CategoriesModel = getModelForClass(Categories, {schemaOptions: {}});
export default CategoriesModel;
//   const doc = new KittenModel({ name: 'SomeCat', species: 'SomeSpecies', age: 0 });
//   await doc.save(); // this should output "We have a kitten here."
//   const doc = new KittenModel({ name: 'SomeCat', species: 'SomeSpecies', age: 2 });
//   await doc.save(); // this should output "We have a big kitty here."
