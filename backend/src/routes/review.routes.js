import { Router } from "express";
import {  addReview, deleteReview, getProductReviews } from "../controllers/reviewController.js";;
import wrapAsync from "../utils/wrapAsync.js";
import { authenticate } from "../middleware/auth.js";


const router = Router({mergeParams: true});

router.post("/getlistings/:productId/review", authenticate,  wrapAsync(addReview) );
router.delete("/getlistings/:productId/review/:reviewId",authenticate, wrapAsync(deleteReview));
router.get("/getlistings/:productId", wrapAsync(getProductReviews));

export default router;
