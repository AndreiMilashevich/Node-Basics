const express = require('express');
const router = express.Router();
const {
  getPost,
  deletePost,
  getEditPost,
  editPost,
  getPosts,
  getAddPost, addPost, getHome,
} = require('../controllers/post-controller');

router.get('/', getHome);
router.get('/posts/:id', getPost);
router.delete('/posts/:id', deletePost);
router.get('/edit/:id', getEditPost);
router.put('/edit/:id', editPost);
router.get('/posts', getPosts);
router.get('/add-post', getAddPost);
router.post('/add-post', addPost);

// app.get('/about-us', (req, res) => {
//   res.render('contacts');
// })

module.exports = router;