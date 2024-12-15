// index.js (backend entry point)

// Import necessary modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"; // Import connectDB from the correct file
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js"; // Ensure the path is correct
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config({ path: './.env' });

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
const corsOptions = {
  origin: [
    "https://food-delivery-phi-umber.vercel.app",  // Frontend Vercel URL
    "https://food-delivery-1x6h.vercel.app",      // Admin Vercel URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies if needed
};
app.use(express.json());
app.use(cors(corsOptions));

// DB connection
connectDB();

// Static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, 'uploads')));

// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Example route using the PlaceOrder component
app.use('/place-order', (req, res) => {
  res.send(PlaceOrder());
});

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
