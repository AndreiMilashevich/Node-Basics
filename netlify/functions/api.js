
import express, { Router } from "express";
import serverless from "serverless-http";
import methodOverride from "method-override";
import postRouter from "../../routes/post-routes";
import contactsRouter from "../../routes/contact-routes";
const mongoose = require('mongoose');
require('dotenv').config();
const postApiRoutes = require('../../routes/api-post-routes');

const app = express();

const router = Router();
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((res) => console.log('db connected'))
  .catch((err) => console.log('Error'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

router.get("/hello", (req, res) => res.send("<h1>Hello World!</h1>"));

app.use("/api/", router);

app.use(postRouter);
app.use(contactsRouter);
app.use(postApiRoutes);

export const handler = serverless(app);
