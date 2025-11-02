import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") dotenv.config();

import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./src/config/db.js";

// Routes
import authValidate from "./src/routes/authValidate.js";
import userRoutes from "./src/routes/user.routes.js";
import listingRoutes from "./src/routes/listing.routes.js";
import contactRoutes from "./src/routes/contact.routes.js";
import reviewRoutes from "./src/routes/review.routes.js";
import CartRoutes from "./src/routes/cart.routes.js";
import orderRoutes from "./src/routes/orderRoutes.js";

// Swagger
import { swaggerDocs } from "./swagger.js";

// ==================
// Express app
// ==================
const app = express();

// Swagger docs


// ==================
// CORS
// ==================
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      "https://cirmatch.com",
      "https://cirmatch.vercel.app",
      "http://localhost:3000",
      "http://localhost:5000"
    ];
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// ==================
// Middlewares
// ==================
app.use(cookieParser());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));
app.use(helmet());
app.use(hpp());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(limiter);

// ==================
// Connect DB
// ==================
connectDB(process.env.MONGODB_URL);

// ==================
// Mount Routes
// ==================
app.use("/api/v1", [
  userRoutes,
  authValidate,
  listingRoutes,
  contactRoutes,
  CartRoutes,
  reviewRoutes,
  orderRoutes,
]);

// Health check
app.get("/", (req, res) => res.send("Server Running"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});
swaggerDocs(app);
// Start server
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(` Server running `)
);