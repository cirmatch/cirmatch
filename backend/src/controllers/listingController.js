import httpStatus from "http-status";
import Listing from "../models/listing.js";
import dotenv from "dotenv";
dotenv.config();

// ✅ Helper: remove undefined fields
const cleanFields = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));

const ALLOWED_STATUSES = ["pending", "confirmed", "cancelled"];


// ✅ Get all listings (paginated)
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

// ✅ Get listing by ID
export const getListingDetail = async (req, res) => {
  const listing = await Listing.findById(req.params.id).lean();

  if (!listing)
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: "Listing not found" });
  res.status(httpStatus.OK).json(listing);
};

// ✅ Create new listing (supports 1–5 images)
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

  // Map uploaded images
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
    images, // ✅ now array of images
    author: req.user._id,
  });

  await newItem.save();

  res.status(httpStatus.CREATED).json({
    message: "Listing created successfully",
    listing: newItem,
  });
};

// ✅ Search listings
export const search = async (req, res) => {
  const q = req.query.q?.trim();
  if (!q)
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Query is required" });

  const results = await Listing.find({ $text: { $search: q } }).lean();
  res.status(httpStatus.OK).json(results);
};

// ✅ Delete a listing
export const deleteProduct = async (req, res) => {
  const deleted = await Listing.findByIdAndDelete(req.params.productId);
  if (!deleted)
    return res.status(404).json({ message: "Listing not found" });
  res.status(200).json({ message: "Listing deleted successfully" });
};

// ✅ Edit/update listing (supports replacing up to 5 images)
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
    quantity: parseFloat(quantity) || undefined,
    price: parseFloat(price) || undefined,
    plastictype,
    metarialtype,
    location,
    sourcingCondition,
    color,
    washingProcess,
  });

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
    return res.status(404).json({ message: "Listing not found" });

  res.status(200).json({
    message: "Listing updated successfully",
    listing: updated,
  });
};

// ========== ADMIN: UPDATE POST STATUS ==========
export const updatePostStatus = async (req, res) => {
  const { PostId } = req.params;
  const { status } = req.body;

  if (!ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Invalid listing status value.' });
  }

const listing = await Listing.findByIdAndUpdate(
  PostId,
  { Status: status },  // <-- Match the capitalization
  { new: true }
);
  if (!listing) {
    return res.status(404).json({ error: 'Listing not found.' });
  }

  res.status(200).json({ message: 'Listing status updated.', listing });
};
