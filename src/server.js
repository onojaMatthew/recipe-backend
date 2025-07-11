import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import { Favorite } from "./models/favorite.js";
import { db } from "./config/db.js";
import job from "./config/cron.js";

const app = express();
const port = ENV.PORT || 5000 

if (ENV.NODE_ENV === "production") {
  job.start();
}
app.use(cors());
app.use(express.json());

db();
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true })    
})

app.post("/api/favorite", async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings} = req.body;
    if (!userId || !recipeId || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const favorite = new Favorite({ userId, recipeId, title, image, cookTime, servings });
    await favorite.save();
    return res.status(201).json({ success: true, message: "Favorite saved", data: favorite });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Internal server error" });
  }
})

app.delete("/api/favorite/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;
    const favorite = await Favorite.findOneAndDelete({ userId: { $eq: userId }, recipeId: { $eq: recipeId }});
    return res.json({ message: "Favorite deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/favorite/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const favorite = await Favorite.find({ userId });
    return res.json(favorite)
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});