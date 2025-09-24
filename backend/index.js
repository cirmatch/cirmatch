// ======================
// ✅ Load environment variables
// ======================
// Only load .env file in non-production environments
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") dotenv.config();

// ======================
// ✅ Security middlewares
// ======================
import helmet from "helmet"; // Sets HTTP headers for app security (CSP, HSTS, XSS protection)
import hpp from "hpp"; // Prevents HTTP Parameter Pollution attacks

// ======================
// ✅ Express essentials
// ======================
import express from "express";
import rateLimit from "express-rate-limit"; // Rate limiting to prevent abuse
import cors from "cors"; // Cross-Origin Resource Sharing
import cookieParser from "cookie-parser"; // Parse cookies for auth/session

// ======================
// ✅ Database connection
// ======================
import connectDB from "./src/config/db.js";

// ======================
// ✅ API route imports
// ======================
import authValidate from "./src/routes/authValidate.js";
import userRoutes from "./src/routes/user.routes.js";
import listingRoutes from "./src/routes/listing.routes.js";
import contactRoutes from "./src/routes/contact.routes.js";
import reviewRoutes from "./src/routes/review.routes.js";
import CartRoutes from "./src/routes/cart.routes.js";
import orderRoutes from "./src/routes/orderRoutes.js";

// ======================
// ✅ Rate limiter setup
// ======================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // Max 10,000 requests per IP per window
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// ======================
// ✅ Initialize Express app
// ======================
const app = express();

// ======================
// ✅ CORS configuration
// ======================
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://cirmatch.com",
      "https://cirmatch.vercel.app",
      "http://localhost:3000"
    ];
    // Allow requests from no-origin (Postman) or whitelisted origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("Blocked by CORS: ", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // Allow cookies and auth headers
}));

// ======================
// ✅ Global middlewares
// ======================
app.use(cookieParser()); // Parse cookies
app.use(express.json({ limit: "40kb" })); // Parse JSON payloads, limit 40kb
app.use(express.urlencoded({ extended: true, limit: "40kb" })); // Parse URL-encoded payloads
app.use(limiter); // Apply rate limiting
app.use(helmet()); // Apply security headers
app.use(hpp()); // Prevent HTTP Parameter Pollution

// ======================
// ✅ Connect to MongoDB
// ======================
connectDB(process.env.MONGODB_URL);

// ======================
// ✅ Mount API routes
// Base path: /api/v1
// ======================
app.use("/api/v1", [
  userRoutes,
  authValidate,
  listingRoutes,
  contactRoutes,
  CartRoutes,
  reviewRoutes,
  orderRoutes,
]);

// ======================
// ✅ Health check route
// ======================
app.get("/", (req, res) => res.send("✅ Server Running"));

// ======================
// ✅ Global error handler
// Catches any unhandled errors in routes
// ======================
app.use((err, req, res, next) => {
  console.error(err.stack); // Log full error stack for debugging
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

// ======================
// ✅ Start Express server
// ======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}/api/v1`)
);
