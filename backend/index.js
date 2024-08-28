import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";
import path from "path";

// Load environment variables
dotenv.config({
    path: ".env"
});

// Connect to the database
databaseConnection();

const app = express();

// Middlewares
app.use(cors({
    origin: process.env.URL,  // Replace with your frontend origin
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", tweetRoute);

// Serve static files from the React frontend app
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));

// Handle any requests that don't match the above routes
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`);
});




