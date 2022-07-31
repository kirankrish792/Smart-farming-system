const axios = require("axios").default;

module.exports.getMoistureValue = async (req, res) => {
  const moisture = await axios.get(
    `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/moisture/data?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`
  );
  const moistureValue = moisture.data;
  let avg = 0;
  for (let i = 0; i < moistureValue.length; i++) {
    avg += parseFloat(moistureValue[i].value);
  }
  avg = avg / moistureValue.length;
  res.render("moisture", { moistureValue, avg });
};

module.exports.deleteMoisture = async (req, res) => {
  const { id } = req.params;
  const deletedData = await axios.delete(
    `https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_IO_USERNAME}/feeds/moisture/data/${id}?X-AIO-Key=${process.env.ADAFRUIT_IO_KEY}`
  );
  res.redirect("/monitor/moisture/");
};
