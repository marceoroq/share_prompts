import mongoose from "mongoose";

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  mongoose.connection.on("connected", () => {
    console.log("[i] Mongoose connected to DB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("[!] Mongoose connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("[i] Mongoose disconnected from DB");
  });

  const isConnected = mongoose.connection.readyState === 1;

  if (isConnected) {
    console.log("[i] MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompts",
    });

    console.log("[i] MongoDB Connected");
  } catch (error) {
    console.error("[!] MongoDB connection error:", error);
    throw error;
  }
};
