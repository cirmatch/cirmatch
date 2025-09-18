import { Review } from "../models/review.js";
import Listing from "../models/listing.js";
import { User } from "../models/user.js";


export const updateProductRating = async (productId) => {
  const product = await Listing.findById(productId).populate("review");

  if (!product || !product.review.length) {
    product.averageRating = 0;
    product.numReviews = 0;
  } else {
    const ratings = product.review.map((rev) => rev.rating);
    const average = ratings.reduce((acc, val) => acc + val, 0) / ratings.length;
    product.averageRating = parseFloat(average.toFixed(1));
    product.numReviews = product.review.length;
  }

  await product.save();
};

// Add Review
export const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { productId } = req.params;
  const fullUser = await User.findById(req.user.id);

  const product = await Listing.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const alreadyReviewed = await Review.findOne({ productId, author: req.user.id });
  if (alreadyReviewed) {
    return res.status(400).json({ message: "You have already reviewed this product." });
  }

  const newReview = new Review({
    rating,
    comment,
    productId,
    author: req.user.id
  });
  await newReview.save();
  product.review.push(newReview._id);
  fullUser.reviewedPost.push(newReview._id);;
  await fullUser.save();
  await product.save();

  return res.status(201).json({ message: "Review added successfully", review: newReview });
};

// Delete Review
export const deleteReview = async (req, res) => {
  const { productId, reviewId } = req.params;

  const product = await Listing.findById(productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }

  if (req.user.role === "admin" || review.author.toString() === req.user.id) {
    await Review.findByIdAndDelete(reviewId);
    product.review = product.review.filter(id => id.toString() !== reviewId);
    await product.save();

    // 🧹 Remove from user.reviewedPost array
    const user = await User.findById(review.author);
    if (user) {
      user.reviewedPost = user.reviewedPost.filter(id => id.toString() !== reviewId);
      await user.save();
    }
    return res.status(200).json({ message: "Review deleted successfully" });
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

// Optional: Get All Reviews for a Product
export const getProductReviews = async (req, res) => {
  const { productId } = req.params;

  const product = await Listing.findById(productId).populate({
    path: 'review',
    populate: { path: 'author', select: 'name email' }
  });

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  return res.status(200).json({ reviews: product.review });
};
