import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connect from "./connect.js";
import usermodel from "./usermodel.js";
import exercisemodel from "./exercisemodel.js";
import logmodel from "./logmodel.js";

dotenv.config();

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

connect();

app.post("/api/users", async (req, res) => {
  const { username } = req.body;

  try {
    const user = await usermodel.create({ username });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
