require('dotenv').config();
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geocode } = require("./utils/geocode");
const { forecast } = require("./utils/forecast");



const app = express();
const pathToPublic = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");


// disable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(pathToPublic))

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "The Scrappy Dev",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "The Scrappy Dev",
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is a help message",
    name: "The Scrappy Dev",
  })
})

app.get('/help/*', (req, res) => {
  res.render("404", {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'The Scrappy Dev',
  })
});

app.get("/weather", async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  try {
    const { latitude, longitude, location } = await geocode(req.query.address);

    if (latitude === 0 && longitude === 0) {
      return res.send({
        error: "Unable to fetch weather data",
      });
    }

    const { forecastStr } = await forecast(latitude, longitude);

    res.send({
      forecast: forecastStr,
      location,
      address: req.query.address,
    });
  } catch (error) {
    res.send(error);
  }
});


// 404 page
app.get('*', (req, res) => {
  res.render("404", {
    title: '404',
    errorMessage: 'Page not found',
    name: 'The Scrappy Dev',
  })
});


app.listen(3000, () => {
  console.log("Server is up on port 3000.");
  console.log({ env: process.env })
})

// thescrappy.dev