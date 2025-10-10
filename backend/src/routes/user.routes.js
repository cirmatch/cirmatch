import { Router } from "express";
import {
  login,
  register,
  resendCode,
  verifyIdentifier,
  refreshToken,
  forgetPassword,
  resetPassword,
  logout,
} from "../controllers/userController.js";
import wrapAsync from "../utils/wrapAsync.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";
import { getUserStats, makeUserAdmin } from "../controllers/Admin/useradmincontroller.js";

const router = Router();

/* ================= AUTH ROUTES ================= */
router.post("/login", wrapAsync(login));
router.post("/register", wrapAsync(register));
router.post("/forget-password", wrapAsync(forgetPassword))
router.post("/reset-password", wrapAsync(resetPassword))
router.post("/refresh-token", wrapAsync(refreshToken));
router.post("/logout", wrapAsync(logout))

/* ================= VERIFICATION ROUTES ================= */
router.post("/verify-email", wrapAsync(verifyIdentifier));
router.post("/resend-code", wrapAsync(resendCode));

/* ================= ADMIN ROUTES ================= */
router.get("/getUserStats", authenticate, authorizeAdmin, wrapAsync(getUserStats));
router.post("/makeuseradmin", authenticate, authorizeAdmin, wrapAsync(makeUserAdmin));

export default router;
