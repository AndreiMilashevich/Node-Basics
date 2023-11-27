const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();
const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.set('view engine', 'ejs');


app.listen(PORT,  (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.get('/', (req, res) => {
  const title = 'home';
  res.render(createPath('index'), {title});
})

app.get('/contacts', (req, res) => {
  const title = 'contacts';
  const contacts = [
    {name: 'Youtube', link: 'http://youtube.com/YauhenKavalchuk'},
    {name: 'Twitter', link: 'http://github.com/YauhenKavalchuk'},
    {name: 'GitHub', link: 'http://twitter.com/YauhenKavalchuk'},
  ]
  res.render(createPath('contacts'), {contacts, title});
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  res.render(createPath('post'), {title});
});

app.get('/posts', (req, res) => {
  const title = 'Posts';
  res.render(createPath('posts'), {title});
});

app.get('/add-post', (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), {title});
});

// app.get('/about-us', (req, res) => {
//   res.render('contacts');
// })

app.use((req, res) => {
  const title = 'Error page';
  res
    .status(404)
    .sendFile(createPath('error'), {title});
});
