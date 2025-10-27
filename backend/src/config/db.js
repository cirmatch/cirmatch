import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Listing from "../models/listing.js";
import { User } from "../models/user.js";
import Order from "../models/order.js";
import Cart from "../models/cart.js";
import { Review } from "../models/review.js";
import Contact from "../models/contactfrom.js";



const connectDB = async (dburl) => {
  try {
    await mongoose.connect(dburl);
    console.log("✅ Connected to MongoDB");

    // Only sync indexes in development mode
    if (process.env.NODE_ENV === "development") {
      await Promise.all([
        Listing.syncIndexes(),
        User.syncIndexes(),
        Cart.syncIndexes(),
        Order.syncIndexes(),
        Review.syncIndexes(),
        Contact.syncIndexes(),
      ]);
      console.log("✅ Indexes synced (development mode)");
    }
  } catch (error) {
    console.error("❌ DB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
