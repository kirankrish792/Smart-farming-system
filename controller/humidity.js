const axios = require("axios").default

module.exports.getHumidityValue = async (req, res) => {
    const Humidity = await axios.get(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/humidity/data?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`)
    const humidityValue = Humidity.data
    let avg = 0
    for (let i = 0; i < humidityValue.length; i++) {
        if (humidityValue[i].value !== "2147483647") {
            avg += parseFloat(humidityValue[i].value)
        }
        // else{
        //     let data = await axios.delete(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/humidity/data/${humidityValue[i].id}?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`)
        //     console.log(data.data)
        // }
    }
    avg = avg / humidityValue.length
    res.render("humidity", { humidityValue, avg })
}

module.exports.deleteHumidity = async (req, res) => {
    const { id } = req.params
    const deletedData = await axios.delete(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/humidity/data/${id}?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`)
    res.redirect('/monitor/humidity/')
}