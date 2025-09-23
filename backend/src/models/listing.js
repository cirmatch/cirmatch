import mongoose, { Schema } from "mongoose";

const listingSchema = new Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    plastictype: { type: String, required: true },    
    metarialtype: { type: String, required: true },   
    quantity: { type: String, required: true },
    price: { type: Number, required: true },
    images: [
      {
        path: String,
        filename: String,
      },
    ],
    sourcingCondition: {
      type: String,
      enum: ["Post Consumer", "Post Industrial", "Mixed"],
      required: false,
    },
    color: { type: String },
    washingProcess: {
      type: String,
      enum: ["Cold Wash", "Hot Wash","Unwashed"],
      required: false,
    },
    Status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled","out_of_stock"],
      default: "pending"
    },
    description: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

// Update index to match actual fields
listingSchema.index({
  title: "text",
  description: "text",
  plastictype: "text",         
  location: "text",
  sourcingCondition: "text",
});

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
