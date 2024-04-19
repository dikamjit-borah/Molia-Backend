const express = require("express");
const router = express.Router();
const { save, titles, sub_collections } = require("../controllers/controller");
const { validateRequest } = require("../middlewares/validate.middleware");
const {
  API_POST_SAVE,
  API_GET_TITLES,
  API_GET_SUB_COLLECTION,
} = require("../schemas/joi.schema");

router.post("/save", validateRequest(API_POST_SAVE), save);
router.get("/titles/:user_id", validateRequest(API_GET_TITLES), titles);
router.get(
  "/sub_collections/:user_id",
  validateRequest(API_GET_SUB_COLLECTION),
  sub_collections
);

module.exports = router;
