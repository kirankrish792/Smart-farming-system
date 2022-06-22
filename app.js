if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

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


app.get("/", (req, res) => {
    res.render('home')
})

app.get("/monitor", async (req, res) => {
    const Temp = await axios.get(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/temperature/data?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`)
    const Humidity = await axios.get(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/humidity/data?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`)
    const tempValue = Temp.data
    const humidityValue = Humidity.data
    res.render("index", { tempValue, humidityValue })
})

app.get("/monitor/temp", async (req, res) => {
    const Temp = await axios.get(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/temperature/data?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`)
    const tempValue = Temp.data
    let avg = 0
    for (let i = 0; i < tempValue.length; i++) {
        avg += parseFloat(tempValue[i].value)
    }
    avg = avg / tempValue.length
    res.render("temp", { tempValue, avg })
})

app.get("/monitor/humidity", async (req, res) => {
    const Humidity = await axios.get(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/humidity/data?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`)
    const humidityValue = Humidity.data
    let avg = 0
    for (let i = 0; i < humidityValue.length; i++) {
        avg += parseFloat(humidityValue[i].value)
    }
    avg = avg / humidityValue.length
    res.render("humidity", { humidityValue, avg })

})

app.post("/monitor/humidity/:id",async(req,res)=>{
    const {id} = req.params
    const deletedData = await axios.delete(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/humidity/data/${id}?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`)
    res.redirect('/monitor/humidit/')
})
app.post("/monitor/temp/:id",async(req,res)=>{
    const {id} = req.params
    const deletedData = await axios.delete(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/temperature/data/${id}?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`)
    res.redirect('/monitor/temp')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`connected to port ${port}`);
})

