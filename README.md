# README

This is a simple weather app that produces a simple weather forecast for a given location.

It utilizes an Express Node.js backend, that contacts the [Mapbox.com](https://mapbox.com) geocoding API service to translate an string location (e.g., "Salt Lake City, UT") to a set of latitude longitude coordinates that's plugged into the Apple Weatherkit API to return the forecast for today.

The app in this repo is deployed at [https://express.onrender.com](https://express.onrender.com).


## Usage

This weather app can be found at [weather.thescrappy.dev](https://weather.thescrappy.dev).



## Deployment

See https://render.com/docs/deploy-node-express-app or follow the steps below:

Create a new web service with the following values:
  * Build Command: `yarn`
  * Start Command: `node app.js`

That's it! Your web service will be live on your Render URL as soon as the build finishes.
