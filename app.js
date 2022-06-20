const express = require('express');
const app = express();
const path = require("path")
const axios = require("axios").default


app.set('view engine',"ejs")
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}))

app.get("/", async(req,res)=>{
    const datas = await axios.get("https://io.adafruit.com/api/v2/pravi587/feeds/welcome-feed/data?X-AIO-Key=aio_NKPG68UIEgYhotbRZEmg6WBy2ZOL")
    const values = datas.data
    // console.log(values)
    res.render("index",{values})
})


app.listen(3000,()=>{
    console.log('connected to port 3000');
})