const axios = require("axios").default

module.exports.getTempValue = async (req, res) => {
    const Temp = await axios.get(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/temperature/data?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`)
    const tempValue = Temp.data
    let avg = 0
    for (let i = 0; i < tempValue.length; i++) {
        if (tempValue[i].value !== "2147483647") {
            avg += parseFloat(tempValue[i].value)
        }
        // else{
        //     let data = await axios.delete(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/temperature/data/${tempValue[i].id}?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`)
        //     console.log(data.data)
        // }
    }
    avg = avg / tempValue.length
    res.render("temp", { tempValue, avg })
}

module.exports.deleteTemp = async (req, res) => {
    const { id } = req.params
    const deletedData = await axios.delete(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/temperature/data/${id}?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`)
    res.redirect('/monitor/temp')
}