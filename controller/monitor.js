const axios = require("axios").default

module.exports.monitorTempHumidity = async (req, res) => {
    const Temp = await axios.get(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/temperature/data?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`)
    const Humidity = await axios.get(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/humidity/data?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`)
    const tempValue = Temp.data
    const humidityValue = Humidity.data
    res.render("index", { tempValue, humidityValue })
}