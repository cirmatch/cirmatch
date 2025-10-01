import { Router } from "express";
import multer from "multer";
import { storage } from "../cloudinary.js";

// Controllers
import { getAlllisting, getListingDetail, newListing, search } from "../controllers/listingController.js";
import { deleteProduct, editListing, updatePostStatus } from "../controllers/Admin/listingAdminController.js";

// Middleware
import { authenticate, authorizeAdmin } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { newListingSchema } from "../validations/listingValidation.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = Router();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // max 5MB per file
});

/* ==============================
   🌐 Public/User Routes
   Accessible by any authenticated user or public
============================== */
router.get("/getAllListings", wrapAsync(getAlllisting));
router.get("/getAllListings/search", wrapAsync(search));
router.get("/getAllListings/:id", wrapAsync(getListingDetail));

// Create listing (authenticated users)
router.post(
  "/listings",
  authenticate,
  upload.array("images", 5),
  validateRequest(newListingSchema),
  wrapAsync(newListing)
);

/* ==============================
   🛡️ Admin / Owner Routes
   Only accessible by admin or owner
============================== */

// Delete a listing
router.delete(
  "/listing/delete/:productId",
  authenticate,
  authorizeAdmin,
  wrapAsync(deleteProduct)
);

// Edit a listing
router.put(
  "/listing/edit/:productId",
  authenticate,
  authorizeAdmin,
  upload.array("images", 5),
  wrapAsync(editListing)
);

// Update listing status (Admin only)
router.patch(
  "/update-status/:PostId",
  authenticate,
  authorizeAdmin,
  wrapAsync(updatePostStatus)
);

export default router;
