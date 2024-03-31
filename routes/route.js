const express = require("express");
const router = express.Router();
const { save } = require("../controllers/controller");
const { validateRequest } = require("../middlewares/validate.middleware");
const { API_POST_SAVE } = require("../schemas/joi.schema");

router.post("/save", validateRequest(API_POST_SAVE), save);

module.exports = router;
