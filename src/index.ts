import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import sanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import User from "./routes/user";
import Warehouse from "./routes/warehouseItems";


const server = express();

// Connect to Mongo DB
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.error(err));
mongoose.Promise = global.Promise;

// Set server parameters
server.use(cors());
server.use(express.json());
server.use(sanitize());

// Add rate limiter to all API calls
const limiter = rateLimit({
	windowMs: 1000, // 1 second
	max: 10, // Limit each IP to 10 requests per `window`
	standardHeaders: true,
	legacyHeaders: false,
});
server.use(limiter);

server.get("/", (req, res) => {
  res.status(200).send("Server Root");
});

// Outline api endpoints
server.use("/api/user", User);
server.use("/api/warehouse", Warehouse);

// Start server on the given port, if none exists, 5000
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`));