import { Router } from "express";
import { contactInfo, getContact, replyContact } from "../controllers/contactController.js";
import wrapAsync from "../utils/wrapAsync.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";



const router = Router();

router.post("/contact",wrapAsync(contactInfo));
router.get("/get-contact",  authenticate, authorizeAdmin, wrapAsync(getContact));
router.post("/send-reply",  authenticate, authorizeAdmin, wrapAsync(replyContact));


export default router;
