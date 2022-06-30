const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const { monitorTempHumidity } = require('../controller/monitor')

router.route('/')
    .get(catchAsync(monitorTempHumidity))


module.exports = router