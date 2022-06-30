const express = require('express')
const router = express.Router();
const axios = require('axios').default
const catchAsync = require('../utils/catchAsync')

router.route('/')
    .get(catchAsync(async (req, res) => {
        const Temp = await axios.get(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/temperature/data?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`)
        const tempValue = Temp.data
        let avg = 0
        for (let i = 0; i < tempValue.length; i++) {
            avg += parseFloat(tempValue[i].value)
        }
        avg = avg / tempValue.length
        res.render("temp", { tempValue, avg })
    }))
router.route("/:id")
    .post(catchAsync(async (req, res) => {
        const { id } = req.params
        const deletedData = await axios.delete(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/temperature/data/${id}?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`)
        res.redirect('/monitor/temp')
    }))



module.exports = router