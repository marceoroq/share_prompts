import mongoose from "mongoose";

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  const isConnected = mongoose.connection.readyState === 1;

  if (isConnected) {
    console.log("[i] MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompts",
    });

    isConnected = true;
    console.log("[i] MongoDB Connected");
  } catch (error) {
    console.error(error);
  }
};
