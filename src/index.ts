import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./routes/user";

const server = express();

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.error(err));

mongoose.Promise = global.Promise;

server.use(cors());
server.use(express.json());
server.get("/", (req, res) => {
  res.status(200).send("Server Root");
});

server.use("/api/user", User);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server is running on port ${port}`));
