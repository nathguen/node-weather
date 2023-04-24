const fs = require("fs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const axios = require("axios");
const path = require("path");
const percent = require("percent-value");

const { cToF } = require("./conversion");

const { JWT_ID, JWT_ISSUER, JWT_EXPIRE, JWT_KEY_ID } = process.env;

const appleKeyFileName = process.env.apple_key_filename;
let appleAuthKey = "";
if (process.env.NODE_ENV === "production") {
  appleAuthKey = fs.readFileSync("/etc/secrets/apple_weatherkit_key");
} else {
  appleAuthKey = fs.readFileSync(
    `${path.join(__dirname, "../../keys/")}/${appleKeyFileName}`
  );
}

const forecast = async (lat, long) => {
  // Creating the signed token needs specific data
  var token = jwt.sign(
    {
      sub: "dev.thescrappy.nodeweatherapp", // the reverse URL App Id you made above
    },
    appleAuthKey,
    {
      jwtid: JWT_ID,
      issuer: JWT_ISSUER,
      expiresIn: JWT_EXPIRE,
      keyid: JWT_KEY_ID,
      algorithm: "ES256", // this is the algorithm Apple used
      header: {
        // see details below for this
        id: JWT_ID,
      },
    }
  );

  const url = `https://weatherkit.apple.com/api/v1/weather/en/${lat}/${long}?dataSets=forecastDaily,currentWeather`;

  // add the token to your headers
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // get the data
  const { data } = await axios.get(url, config);
  const { currentWeather, forecastDaily } = data;

  const todayForecast = forecastDaily.days[0];

  let forecastStr = `It is currently ${cToF(
    currentWeather.temperature
  )} degrees out, but feels like ${cToF(
    currentWeather.temperatureApparent
  )} degrees. The high today is ${cToF(
    todayForecast.temperatureMax
  )} degrees and the low is ${cToF(todayForecast.temperatureMin)} degrees.`;

  if (_.includes(["snow", "rain"], todayForecast.precipitationType)) {
    forecastStr += ` There is a ${percent(todayForecast.precipitationChance).of(
      1
    )}% chance of ${todayForecast.precipitationType}.`;
  }

  return {
    ...data,
    forecastStr,
  };
};

module.exports = {
  forecast,
};
