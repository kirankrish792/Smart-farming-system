const express = require('express');
const app = express();
const path = require("path")
const axios = require("axios").default
const engine = require('ejs-mate');


app.engine('ejs', engine);

app.set('view engine', "ejs")
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }))


app.get("/", async (req, res) => {
    res.render('home')
})

app.get("/monitor", async (req, res) => {
    const Temp = await axios.get("https://io.adafruit.com/api/v2/pravi587/feeds/temperature/data?X-AIO-Key=aio_NKPG68UIEgYhotbRZEmg6WBy2ZOL")
    const Humidity = await axios.get("https://io.adafruit.com/api/v2/pravi587/feeds/humidity/data?X-AIO-Key=aio_NKPG68UIEgYhotbRZEmg6WBy2ZOL")
    const tempValue = Temp.data
    const humidityValue = Humidity.data
    res.render("index", { tempValue, humidityValue })
})


app.listen(3000, () => {
    console.log('connected to port 3000');
})

