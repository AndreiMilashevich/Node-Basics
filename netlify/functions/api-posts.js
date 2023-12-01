import express from "express";
import serverless from "serverless-http";
import cors = from "cors";
import methodOverride from "method-override";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postApiRoutes from "../../routes/api-post-routes";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("db connected"))
  .catch((err) => console.log("Error", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(postApiRoutes);

export const handler = serverless(app);
