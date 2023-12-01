const express = require('express');
const router = express.Router();
const {
  getPost,
  deletePost,
  editPost,
  getPosts,
  addPost,
} = require('../controllers/api-post-controller');

// Get all posts
router.get('/api/posts', getPosts);
// Add new post
router.post('/api/post', addPost);
// Get post
router.get('/api/post/:id', getPost);
// Delete post
router.delete('/api/post/:id', deletePost);
// Edit post
router.put('/api/edit/:id', editPost);

module.exports = router;