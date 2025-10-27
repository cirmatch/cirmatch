import mongoose from "mongoose";

const connectDB = async (dburl) => {
  try {
    await mongoose.connect(dburl);
    await Listing.syncIndexes();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
