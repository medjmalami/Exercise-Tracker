import mongoose from "mongoose";

const exercisemodel = new mongoose.Schema({
  username: String,
  description: String,
  duration: Number,
  date: Date,
});

export default mongoose.model("Exercise", exercisemodel);
