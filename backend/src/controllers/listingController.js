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

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "cirmatch" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};
/**
 * Get all listings with smart, balanced feed sorting
 * Combines purchaseCount, wishlistCount, and viewCount using weighted popularity
 * Supports pagination and lean responses for speed
 */
export const getAlllisting = async (req, res) => {
  // Parse pagination info
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = parseInt(req.query.limit) || 0;
  const skip = (page - 1) * (limit || 0);

  // Aggregation pipeline for smart balanced sorting
  const pipeline = [
    {
      $addFields: {
        // Weighted popularity formula
        popularity: {
          $add: [
            { $multiply: ["$purchaseCount", 3] }, // Purchases have highest weight
            { $multiply: ["$wishlistCount", 2] }, // Wishlists have medium weight
            "$viewCount"                          // Views have lowest weight
          ]
        }
      }
    },
    { $sort: { popularity: -1, createdAt: -1 } }, // Sort by popularity, then newest first
  ];

  // Apply pagination if limit > 0
  if (limit > 0) {
    pipeline.push({ $skip: skip }, { $limit: limit });
  }

  // Run both listing query and count in parallel
  const [listings, totalCount] = await Promise.all([
    Listing.aggregate(pipeline),
    Listing.countDocuments(),
  ]);
  // Respond with paginated smart feed
  res.status(httpStatus.OK).json({
    data: listings,
    total: totalCount,
    page,
    totalPages: limit > 0 ? Math.ceil(totalCount / limit) : 1,
  });
};

/**
 * Get listing by ID and increase view count by 1
 * @param {Object} req - Express request object containing listing ID in req.params
 * @param {Object} res - Express response object
 */
export const getListingDetail = async (req, res) => {
  const listing = await Listing.findByIdAndUpdate(
    req.params.id,
    { $inc: { viewCount: 1 } }, // increment viewCount by 1
    { new: true, lean: true }   // return updated document as plain JS object
  );

  // If listing not found, return 404 response
  if (!listing)
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ message: "Listing not found" });

  // Return the listing with updated view count
  res.status(httpStatus.OK).json(listing);
};

/**
 * Create a new listing
 * Supports uploading 1–5 images
 */
export const newListing = async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least 1 image is required" });
    }

    const {
      title, description, quantity, price, plastictype,
      metarialtype, location, sourcingCondition,
      color, washingProcess
    } = req.body;

    const imageUploads = await Promise.all(
      req.files.map(async (file) => {
        let bufferToUpload = file.buffer;
        if (file.buffer.length > 2 * 1024 * 1024) { // compress only if >500KB
          bufferToUpload = await compressImage(file.buffer);
        }
        const uploadRes = await uploadToCloudinary(bufferToUpload);
        return { path: uploadRes.secure_url, filename: uploadRes.public_id };
      })
    );

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

    res.status(201).json({ message: "Listing created successfully", listing: newItem });
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
