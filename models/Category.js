import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";



const CategorySchema = new Schema ({
  name: {type:String, required: true},
  parent: {type:mongoose.Types.ObjectId, ref: 'Category'},
  properties: [{type: Object}],
  image:  [{ type: String }],
});

export const Category = models.Category || model('Category', CategorySchema);