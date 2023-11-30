const createPath = require('../helpers/create-path');
const Contact = require("../models/contact");

const handleError = (res, error) => {
  console.log(error);
  res.render(createPath('error'), { title: 'error' });
};

const getContacts = (req, res) => {
  const title = 'contacts';
  Contact
    .find()
    .then((contacts) => res.render(createPath('contacts'), {contacts, title}))
    .catch((err) => {
      handleError(res, err);
    });
};

module.exports = {
  getContacts,
}