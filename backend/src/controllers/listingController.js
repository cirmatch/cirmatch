import httpStatus from "http-status";
import Listing from "../models/listing.js";
import sharp from "sharp";
import fs from "fs";
import { cloudinary } from "../cloudinary.js";
/**
 * Helper: Remove undefined fields from an object
 * Ensures only defined fields are sent in update queries.
 */
const cleanFields = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));


const compressImage = async (buffer) => {
  let quality = 80;
  let output = await sharp(buffer).jpeg({ quality }).toBuffer();

  while (output.length > 1024 * 1024 && quality > 20) {
    quality -= 10;
    output = await sharp(buffer).jpeg({ quality }).toBuffer();
  }

  return output;
};

const uploadToCloudinary = async (buffer) => {
  const tempPath = `./temp_${Date.now()}.jpg`;
  fs.writeFileSync(tempPath, buffer);
  const result = await cloudinary.uploader.upload(tempPath, {
    folder: "cirmatch",
  });
  fs.unlinkSync(tempPath);
  return result;
};
/**
 * Get all listings (paginated)
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
 * Get listing by ID
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
 * Create a new listing
 * Supports uploading 1–5 images
 */
export const newListing = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
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

  // Compress + Upload all images
  const imageUploads = [];
  for (const file of req.files) {
    const compressed = await compressImage(file.buffer);
    const uploadRes = await uploadToCloudinary(compressed);
    imageUploads.push({
      path: uploadRes.secure_url,
      filename: uploadRes.public_id,
    });
  }

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
    images: imageUploads,
    author: req.user._id,
  });

  await newItem.save();

  res.status(201).json({
    message: "Listing created successfully",
    listing: newItem,
  });
};

/**
 * Search listings by text query
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
