import mongoose, { mongo } from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const MONGO_URI = process.env.MONGO_URI;
export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URI);
    console.log("Mongoose connected through " + connect.connection.host);
  } catch (error) {
    console.log("Mongo connection error.", error);
  }
};
