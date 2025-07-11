 import { model, Schema } from "mongoose";

 const favoriteSchema = new Schema({
  userId: { type: String, required: true },
  recipeId: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String },
  cookTime: { type: String },
  servings: { type: String },
  
 }, { timestamps: true });

 export const Favorite = model("Favorite", favoriteSchema);