import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import logger from "./middlewares/logger/logger";
import ruleRoutes from "./routes/rule.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/v1/rule", ruleRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.error(err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
