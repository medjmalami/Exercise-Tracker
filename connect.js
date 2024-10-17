import mongoose from "mongoose";

const connect = async () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB", error);
    });
};

export default connect;
