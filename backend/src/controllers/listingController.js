import httpStatus from "http-status";
import Listing from "../models/listing.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * 🔹 Helper: Remove undefined fields from an object
 * Ensures only defined fields are sent in update queries.
 */
const cleanFields = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));

/**
 * ✅ Allowed status values for listings
 */
const ALLOWED_STATUSES = ["pending", "confirmed", "cancelled", "out_of_stock"];

/**
 * 📝 Get all listings (paginated)
 * Supports query parameters: page & limit
 */
export const getAlllisting = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = parseInt(req.query.limit) || 0;
  const skip = (page - 1) * (limit || 0);

  const query = Listing.find();

  if (limit > 0) {
    query.skip(skip).limit(limit);
  }

  const [listings, totalCount] = await Promise.all([
    query.lean(),
    Listing.countDocuments(),
  ]);

  res.status(httpStatus.OK).json({
    data: listings,
    total: totalCount,
    page,
    totalPages: limit > 0 ? Math.ceil(totalCount / limit) : 1,
  });
};

/**
 * 📝 Get listing by ID
 * @param {string} id - Listing ID from req.params
 */
export const getListingDetail = async (req, res) => {
  const listing = await Listing.findById(req.params.id).lean();

  if (!listing)
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: "Listing not found" });

  res.status(httpStatus.OK).json(listing);
};

/**
 * 🆕 Create a new listing
 * Supports uploading 1–5 images
 */
export const newListing = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "At least 1 image is required" });
  }

  const {
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

  // Map uploaded images to array
  const images = req.files.map((file) => ({
    path: file.path,
    filename: file.filename,
  }));

  const newItem = new Listing({
    title,
    description,
    quantity,
    price: parseFloat(price) || undefined,
    location,
    plastictype,
    metarialtype,
    sourcingCondition,
    color,
    washingProcess,
    images,
    author: req.user._id, // Set author from authenticated user
  });

  await newItem.save();

  res.status(httpStatus.CREATED).json({
    message: "Listing created successfully",
    listing: newItem,
  });
};

/**
 * 🔍 Search listings by text query
 * @query {string} q - Search term
 */
export const search = async (req, res) => {
  const q = req.query.q?.trim();
  if (!q)
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Query is required" });

  const results = await Listing.find({ $text: { $search: q } }).lean();
  res.status(httpStatus.OK).json(results);
};

/**
 * ❌ Delete a listing by ID
 * @param {string} productId - Listing ID from req.params
 */
export const deleteProduct = async (req, res) => {
  const deleted = await Listing.findByIdAndDelete(req.params.productId);
  if (!deleted)
    return res.status(httpStatus.NOT_FOUND).json({ message: "Listing not found" });

  res.status(httpStatus.OK).json({ message: "Listing deleted successfully" });
};

/**
 * ✏️ Edit/update a listing
 * Supports replacing up to 5 images
 */
export const editListing = async (req, res) => {
  const {
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

/**
 * 🛠️ Admin: Update listing status
 * @param {string} PostId - Listing ID
 * @body {string} status - New status (must be in ALLOWED_STATUSES)
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
