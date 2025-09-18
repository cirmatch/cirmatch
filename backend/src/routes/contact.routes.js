import { Router } from "express";
import { contactInfo } from "../controllers/contactController.js";
import wrapAsync from "../utils/wrapAsync.js";



const router = Router();

router.post("/contact",wrapAsync(contactInfo));




export default router;
