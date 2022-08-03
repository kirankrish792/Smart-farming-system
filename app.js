if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const engine = require("ejs-mate");
const compression = require("compression");




const ExpressError = require("./utils/ExpressError");
const monitorRoute = require("./routes/monitor");
const tempRoute = require("./routes/temp");
const humidityRoute = require("./routes/humidity");
const moistureRoute = require("./routes/moisture");
const soilTempRoute = require("./routes/soilTemp");

app.set("view engine", "ejs");
app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/monitor", monitorRoute);
app.use("/monitor/temp", tempRoute);
app.use("/monitor/humidity", humidityRoute);
app.use("/monitor/moisture", moistureRoute);
app.use("/monitor/soiltemp", soilTempRoute);


app.use(compression());

app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || err.response.status || 500;
  err.message = err.message || "Something went wrong";
  res.status(statusCode).render("error", { err, statusCode });
});

const port = process.env.PORT || 3004;

app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
