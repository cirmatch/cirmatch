import httpStatus from "http-status";
import Listing from "../../models/listing.js";

/**
  Helper: Remove undefined fields from an object
  Ensures only defined fields are sent in update queries.
 */
const cleanFields = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));

/*Allowed status values for listings*/
const ALLOWED_STATUSES = ["pending", "confirmed", "cancelled", "out_of_stock"];

/*
  Delete a listing by ID
  @param {string} productId - Listing ID from req.params
 */
export const deleteProduct = async (req, res) => {
  const deleted = await Listing.findByIdAndDelete(req.params.productId);
  if (!deleted)
    return res.status(httpStatus.NOT_FOUND).json({ message: "Listing not found" });

  res.status(httpStatus.OK).json({ message: "Listing deleted successfully" });
};

/*
  Edit/update a listing
  Supports replacing up to 5 images
 */
export const editListing = async (req, res) => {
  const {
    sellerName,
    title,
    description,
    quantity,
    price,
    plastictype,
    metarialtype,
    location,
    sourcingCondition,
    color,
    washingProcess,
  } = req.body;
  
  const updatedFields = cleanFields({
    sellerName,
    title,
    description,
    quantity: quantity || undefined,
    price: parseFloat(price) || undefined,
    plastictype,
    metarialtype,
    location,
    sourcingCondition,
    color,
    washingProcess,
  });

  // Replace images if new files uploaded
  if (req.files && req.files.length > 0) {
    updatedFields.images = req.files.map((file) => ({
      path: file.path,
      filename: file.filename,
    }));
  }

  const updated = await Listing.findByIdAndUpdate(
    req.params.productId,
    updatedFields,
    { new: true }
  );

  if (!updated)
    return res.status(httpStatus.NOT_FOUND).json({ message: "Listing not found" });

  res.status(httpStatus.OK).json({
    message: "Listing updated successfully",
    listing: updated,
  });
};

/*
  Admin: Update listing status
  @param {string} PostId - Listing ID
  @body {string} status - New status (must be in ALLOWED_STATUSES)
 */
export const updatePostStatus = async (req, res) => {
  const { PostId } = req.params;
  const { status } = req.body;

  if (!ALLOWED_STATUSES.includes(status)) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: "Invalid listing status value." });
  }

  const listing = await Listing.findByIdAndUpdate(
    PostId,
    { Status: status }, // Ensure matching capitalization in DB
    { new: true }
  );

  if (!listing) {
    return res.status(httpStatus.NOT_FOUND).json({ error: "Listing not found." });
  }

  res.status(httpStatus.OK).json({ message: "Listing status updated.", listing });
};
