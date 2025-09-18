import { Router } from "express";
import multer from "multer";
import { storage } from "../cloudinary.js";

import { deleteProduct, editListing, getAlllisting, getListingDetail, newListing, search, updatePostStatus } from "../controllers/listingController.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";
import {validateRequest} from "../middleware/validateRequest.js";
import { editListingSchema, newListingSchema } from "../validations/listingValidation.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = Router();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.get("/getAllListings", wrapAsync(getAlllisting));

router.get("/getAllListings/search",wrapAsync(search) );
router.get("/getAllListings/:id", wrapAsync(getListingDetail));
router.post(
  "/listings",
  authenticate,
  upload.array("images", 5),
  validateRequest(newListingSchema),
  wrapAsync(newListing)
);
router.delete("/listing/delete/:productId", authenticate, authorizeAdmin, wrapAsync(deleteProduct));
router.put(
  "/listing/edit/:productId",
  authenticate,
  authorizeAdmin,
  upload.array("images", 5),
  
  wrapAsync( editListing)
)

router.patch(
  "/update-status/:PostId",
  authenticate,
  authorizeAdmin,
  wrapAsync(updatePostStatus)
);

export default router;
