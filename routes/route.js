const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/search', controller.search);

module.exports = router;
