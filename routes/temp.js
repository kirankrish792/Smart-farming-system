const express = require('express')
const router = express.Router();
const axios = require('axios').default
const catchAsync = require('../utils/catchAsync')
const { getTempValue, deleteTemp } = require('../controller/temp')

router.route('/')
    .get(catchAsync(getTempValue))


router.route("/:id")
    .post(catchAsync(deleteTemp))


module.exports = router