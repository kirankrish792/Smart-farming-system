const express = require('express');
const app = express();
const path = require("path")
const axios = require("axios").default
const engine = require('ejs-mate');




app.set('view engine', "ejs")
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }))


app.get("/", async (req, res) => {
    res.render('home')
})

app.get("/monitor", async (req, res) => {
    const Temp = await axios.get("https://io.adafruit.com/api/v2/pravi587/feeds/temperature/data?X-AIO-Key=aio_DEfp28yizJSBSiwRCIfxPR6AgC6i")
    const Humidity = await axios.get("https://io.adafruit.com/api/v2/pravi587/feeds/humidity/data?X-AIO-Key=aio_DEfp28yizJSBSiwRCIfxPR6AgC6i")
    const tempValue = Temp.data
    const humidityValue = Humidity.data
    res.render("index", { tempValue, humidityValue })
})

app.get("/monitor/temp", async (req, res) => {
    const Temp = await axios.get("https://io.adafruit.com/api/v2/pravi587/feeds/temperature/data?X-AIO-Key=aio_DEfp28yizJSBSiwRCIfxPR6AgC6i")
    const tempValue = Temp.data
    let avg = 0
    for (let i = 0; i < tempValue.length; i++) {
        avg += parseFloat(tempValue[i].value)
    }
    avg = avg / tempValue.length
    res.render("temp", { tempValue, avg })
})

app.get("/monitor/humidity", async (req, res) => {
    const Humidity = await axios.get("https://io.adafruit.com/api/v2/pravi587/feeds/humidity/data?X-AIO-Key=aio_DEfp28yizJSBSiwRCIfxPR6AgC6i")
    const humidityValue = Humidity.data
    let avg = 0
    for (let i = 0; i < humidityValue.length; i++) {
        avg += parseFloat(humidityValue[i].value)
    }
    avg = avg / humidityValue.length
    res.render("humidity", { humidityValue, avg })

})

app.listen(process.env.PORT, () => {
    console.log('connected to port 3000');
})

