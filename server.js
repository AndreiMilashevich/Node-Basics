const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Post = require('./models/post');
const Contact = require('./models/contact');
const key = require('./variables/mongo');

const PORT = 3000;
const app = express();

mongoose.connect(key, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((res) => console.log('db connected'))
  .catch((err) => console.log('Error'));

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.set('view engine', 'ejs');


app.listen(PORT,  (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }))

app.use(express.static('styles'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), {title});
})

app.get('/contacts', (req, res) => {
  const title = 'contacts';
  Contact
    .find()
    .then((contacts) => res.render(createPath('contacts'), {contacts, title}))
    .catch((err) => {
      console.log(err);
      res.render(createPath('error'), { title: 'error' });
    });
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  Post
    .findById(req.params.id)
    .then((post) => res.render(createPath('post'), {post, title}))
    .catch((err) => {
      console.log(err);
      res.render(createPath('error'), { title: 'error' });
    });
});

app.get('/posts', (req, res) => {
  const title = 'Posts';

  Post
    .find()
    .sort({ createdAt: -1 })
    .then((posts) => res.render(createPath('posts'), {posts, title}))
    .catch((err) => {
      console.log(err);
      res.render(createPath('error'), { title: 'error' });
    });
});

app.get('/add-post', (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), {title});
});

app.post('/add-post', (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((result) => res.redirect('/posts'))
    .catch((err) => {
      console.log('err');
      res.render(createPath('error'), { title: 'error' });
    });
})

// app.get('/about-us', (req, res) => {
//   res.render('contacts');
// })

app.use((req, res) => {
  const title = 'Error page';
  res
    .status(404)
    .sendFile(createPath('error'), {title});
});
