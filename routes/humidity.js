const express = require('express')
const router = express.Router();
const catchAsync = require('../utils/catchAsync')

const { getHumidityValue, deleteHumidity } = require("../controller/humidity")


router.route('/')
    .get(catchAsync(getHumidityValue))


router.route("/:id")
    .post(catchAsync(deleteHumidity))

module.exports = router;