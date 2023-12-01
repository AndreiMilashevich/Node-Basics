const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override');
const postApiRoutes = require('./routes/api-post-routes');
const postRouter = require('./routes/post-routes');
const contactsRouter = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const app = express();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((res) => console.log('db connected'))
  .catch((err) => console.log('Error'));

app.set('view engine', 'ejs');

app.listen(process.env.PORT,  (error) => {
  error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);
});

app.use(express.urlencoded({ extended: false }))

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
