// ✅ Load environment variables from .env file if not in production
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") dotenv.config();

// ✅ Security middlewares
import helmet from "helmet"; // Sets various HTTP headers for app security
import hpp from "hpp"; // Prevent HTTP Parameter Pollution

// ✅ Express essentials
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";

// ✅ DB connection
import connectDB from "./src/config/db.js";

// ✅ Route imports
import authValidate from "./src/routes/authValidate.js";
import userRoutes from "./src/routes/user.routes.js";
import listingRoutes from "./src/routes/listing.routes.js";
import contactRoutes from "./src/routes/contact.routes.js";
import reviewRoutes from "./src/routes/review.routes.js";
import CartRoutes from "./src/routes/cart.routes.js";
import orderRoutes from "./src/routes/orderRoutes.js"
// ✅ Setup rate limiter to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

const app = express();

// ✅ CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://cirmatch.com",
      "cirmatch.vercel.app",
      "http://localhost:3000"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("Blocked by CORS: ", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));
app.use(limiter);
app.use(helmet());

app.use(hpp());

// ✅ Connect to MongoDB
connectDB(process.env.MONGODB_URL);

// ✅ API routes under `/api/v1`
app.use("/api/v1", [
  userRoutes,
  authValidate,
  listingRoutes,
  contactRoutes,
  CartRoutes,
  reviewRoutes,
  orderRoutes,
]);

// ✅ Health check route
app.get("/", (req, res) => res.send("✅ Server Running"));

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}/api/v1`)
);
