
import express, { Router } from "express";
import serverless from "serverless-http";
const mongoose = require('mongoose');
require('dotenv').config();
const postApiRoutes = require('../../routes/api-post-routes');

const api = express();

const router = Router();
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((res) => console.log('db connected'))
  .catch((err) => console.log('Error'));

router.get("/hello", (req, res) => res.send("<h1>Hello World!</h1>"));

api.use("/api/", router);

api.use(postApiRoutes);


export const handler = serverless(api);
