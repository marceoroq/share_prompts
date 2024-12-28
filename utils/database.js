import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("[i] MongoDB is already connected");
    return;
  }

  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      console.error("MONGODB_URI was not found");
    } else {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "share_prompts",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      isConnected = true;
      console.log("[i] MongoDB Connected");
    }
  } catch (error) {
    console.error(error);
  }
};
