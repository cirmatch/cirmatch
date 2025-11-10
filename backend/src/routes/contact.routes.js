import { Router } from "express";
import { contactInfo, deleteContact, getContact, replyContact } from "../controllers/contactController.js";
import wrapAsync from "../utils/wrapAsync.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";



const router = Router();

router.post("/contact",wrapAsync(contactInfo));
router.get("/get-contact",  authenticate, authorizeAdmin, wrapAsync(getContact));
router.post("/send-reply",  authenticate, authorizeAdmin, wrapAsync(replyContact));
router.delete("/delete-contact/:contactId",  authenticate, authorizeAdmin, wrapAsync(deleteContact));


export default router;
