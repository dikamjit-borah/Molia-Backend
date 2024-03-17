const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.post('/save', controller.save);

module.exports = router;
