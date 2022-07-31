const axios = require("axios").default;

module.exports.monitorTempHumidity = async (req, res) => {
  const Temp = await axios.get(
    `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/temperature/data?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`
  );
  const Humidity = await axios.get(
    `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/humidity/data?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`
  );
  const Moisture = await axios.get(
    `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/moisture/data?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`
  );
  const tempValue = Temp.data;
  const humidityValue = Humidity.data;
  const moistureValue = Moisture.data;

  const temdata = tempValue.map((temp) =>
    temp.value !== "2147483647" ? parseFloat(temp.value) : 0
  );
  const humdata = humidityValue.map((humidity) =>
    humidity.value !== "2147483647" ? parseFloat(humidity.value) : 0
  );
  const moisdata = moistureValue.map((moisture) =>
    moisture.value !== "2147483647" ? parseFloat(moisture.value) : 0
  );
  let count = 0;
  const finalTime = tempValue.map((temp) => {
    return ++count;
  });

  const weData = await axios.get(
    "http://api.openweathermap.org/data/2.5/forecast?q=Kozhikode&appid=e8b22b36da932dce8f31ec9be9cb68a3"
  );
  const weDa = weData.data.list[0].weather[0];

  res.render("index", {
    tempValue,
    humidityValue,
    moistureValue,
    temdata,
    humdata,
    moisdata,
    finalTime,
    weDa,
  });
};
