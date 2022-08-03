const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

const { getSoilTempValue, deleteSoilTemp } = require("../controller/soilTemp");

router.route("/").get(catchAsync(getSoilTempValue));

router.route("/:id").post(catchAsync(deleteSoilTemp));

module.exports = router;
