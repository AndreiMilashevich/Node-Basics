const express = require('express');
const router = express.Router();
const {getContacts} = require("../controllers/api-contacts-controller");

// Get all contacts
router.get('/api/contacts', getContacts);


module.exports = router;