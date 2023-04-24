# README

This is a simple weather app that produces a simple weather forecast for a given location.

It utilizes an Express Node.js backend, that contacts the [Mapbox.com](https://mapbox.com) geocoding API service to translate an string location (e.g., "Salt Lake City, UT") to a set of latitude longitude coordinates that's plugged into the Apple Weatherkit API to return the forecast for today.

The app in this repo is deployed at [https://express.onrender.com](https://express.onrender.com).


## Usage

This weather app can be found at [weather.thescrappy.dev](https://weather.thescrappy.dev). Please be patient with this link. It utilizes a free tier service from [render.com](https://render.com), so it can be a little slow when you first try to load the page.



https://user-images.githubusercontent.com/6416887/228396974-23dba11b-c68d-4f5d-9cae-bcac51b3f6a8.mov







## Deployment

See https://render.com/docs/deploy-node-express-app or follow the steps below:

Create a new web service with the following values:
  * Build Command: `yarn`
  * Start Command: `node app.js`

That's it! Your web service will be live on your Render URL as soon as the build finishes.
