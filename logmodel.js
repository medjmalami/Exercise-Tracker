import mongoose from "mongoose";

const logmodel = new mongoose.Schema({
  username: String,
  count: Number,
  log: [
    {
      description: String,
      duration: Number,
      date: Date,
    },
  ],
});

export default mongoose.model("Log", logmodel);
