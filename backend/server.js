import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import foodRoute from "./routes/foodRoute.js"; // Ensure the path is correct
import { connectDB } from "./config/db.js"; // Import connectDB from the correct file

// Load environment variables
dotenv.config();

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRoute);
app.use("/images",express.static('uploads'))
// app.use("/images",express.static(path.join(__dirname, 'backend')));

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
