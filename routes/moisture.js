const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

const { getMoistureValue, deleteMoisture } = require("../controller/moisture");

router.route("/").get(catchAsync(getMoistureValue));

router.route("/:id").post(catchAsync(deleteMoisture));

module.exports = router;
