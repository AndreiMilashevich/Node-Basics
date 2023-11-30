const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const key = require('./variables/mongo');
const methodOverride = require('method-override');
const postRouter = require('./routes/post-routes');
const contactsRouter = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const PORT = 3000;
const app = express();

mongoose.connect(key, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((res) => console.log('db connected'))
  .catch((err) => console.log('Error'));

app.set('view engine', 'ejs');

app.listen(PORT,  (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }))

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.use(postRouter);
app.use(contactsRouter);

app.use((req, res) => {
  const title = 'Error page';
  res
    .status(404)
    .sendFile(createPath('error'), {title});
});
