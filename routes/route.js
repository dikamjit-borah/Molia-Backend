const express = require("express");
const router = express.Router();
const { save, titles } = require("../controllers/controller");
const { validateRequest } = require("../middlewares/validate.middleware");
const { API_POST_SAVE, API_GET_FETCH } = require("../schemas/joi.schema");

router.post("/save", validateRequest(API_POST_SAVE), save);
router.get("/titles/:user_id", validateRequest(API_GET_FETCH), titles);

module.exports = router;
