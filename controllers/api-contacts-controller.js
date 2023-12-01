const Post = require('../models/post');

const handleError = (res, error) => {
  res.status(500).send(error);
};

const getContacts = (req, res) => {
  Post
    .find()
    .then((posts) => res.status(200).json(posts))
    .catch((err) => {
      handleError(res, err);
    });
};

module.exports = {
  getContacts,
};