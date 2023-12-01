import express from "express";
import serverless from "serverless-http";
import methodOverride from "method-override";
import postRouter from "../../routes/post-routes";
import contactsRouter from "../../routes/contact-routes";
import createPath from "../../helpers/create-path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postApiRoutes from "../../routes/api-post-routes";
import path from "path";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("db connected"))
  .catch((err) => console.log("Error", err));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'styles')));
app.use(methodOverride("_method"));

app.use(postRouter);
app.use(contactsRouter);
app.use(postApiRoutes);

app.use((req, res) => {
  const title = "Error page";
  res
    .status(404)
    .sendFile(createPath("error"), { title });
});

export const handler = serverless(app);