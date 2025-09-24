import mongoose, { Schema } from "mongoose";

/**
 * Listing Schema
 * Represents a recycled plastic listing in the system
 */
const listingSchema = new Schema(
  {
    // Title of the listing
    title: { type: String, required: true },

    // Location of the plastic source
    location: { type: String, required: true },

    // Type of plastic, stored in uppercase
    plastictype: { 
      type: String, 
      required: true, 
      set: (value) => value.toUpperCase() 
    },

    // Material type of the plastic
    metarialtype: { type: String, required: true },

    // Quantity of the material
    quantity: { type: String, required: true },

    // Price per unit
    price: { type: Number, required: true },

    // Images associated with the listing
    images: [
      {
        path: String,       // File path or URL
        filename: String,   // Original filename
      },
    ],

    // Sourcing condition of the plastic
    sourcingCondition: {
      type: String,
      enum: ["Post Consumer", "Post Industrial", "Mixed"],
      required: false,
    },

    // Color of the plastic
    color: { type: String },

    // Washing process applied to the plastic
    washingProcess: {
      type: String,
      enum: ["Cold Wash", "Hot Wash", "Unwashed"],
      required: false,
    },

    // Status of the listing
    Status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "out_of_stock"],
      default: "pending",
    },

    // Description of the listing
    description: { type: String, required: true },

    // Author (User who created the listing)
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Array of review references
    review: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

/**
 * Text index for search functionality
 * Enables full-text search on the specified fields
 */
listingSchema.index({
  title: "text",
  description: "text",
  plastictype: "text",
  location: "text",
  sourcingCondition: "text",
});

// Create Listing model
const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
