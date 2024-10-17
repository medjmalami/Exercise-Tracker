import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connect from "./connect.js";
import usermodel from "./usermodel.js";
import exercisemodel from "./exercisemodel.js";
import logmodel from "./logmodel.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
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

app.get("/api/users", async (req, res) => {
  try {
    const users = await usermodel.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.post("/api/users/:_id/exercises", async (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;
  if (date === undefined) {
    date = new Date();
  } else {
    date = new Date(date);
  }
  try {
    const user = await usermodel.findById(_id);
    const exercice = await exercisemodel.create({
      username: user.username,
      description,
      duration,
      date: date.getTime(),
    });
    res.json({
      exercice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error adding exercise",
    });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
