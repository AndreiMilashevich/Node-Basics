
import express, { Router } from "express";
import serverless from "serverless-http";
import methodOverride from "method-override";
import postRouter from "../../routes/post-routes";
import contactsRouter from "../../routes/contact-routes";
import createPath from "../../helpers/create-path";
const mongoose = require('mongoose');
require('dotenv').config();
const postApiRoutes = require('../../routes/api-post-routes');

const app = express();

const router = Router();
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((res) => console.log('db connected'))
  .catch((err) => console.log('Error'));

app.set('view engine', 'ejs');

app.listen(process.env.PORT,  (error) => {
  error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);
});

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.use(postRouter);
app.use(contactsRouter);
app.use(postApiRoutes);

app.use((req, res) => {
  const title = 'Error page';
  res
    .status(404)
    .sendFile(createPath('error'), {title});
});

export const handler = serverless(app);
