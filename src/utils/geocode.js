const axios = require("axios");

/**
 *
 * @param {string} address
 */
const geocode = async (address) => {
  try {
    const mapboxAccessToken = process.env.mapbox_access_token;
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${mapboxAccessToken}`;

    const {
      data: { features },
    } = await axios.get(geocodingUrl);

    if (features.length === 0) {
      throw new Error("Unable to find location. Try another search.");
    }

    const placeData = features[0];

    const { center, place_name } = placeData;
    const latitude = center[1];
    const longitude = center[0];
    const location = place_name;

    return {
      latitude,
      longitude,
      location,
    };
  } catch (error) {
    if (
      (error && error.response && error.response.status === 404) ||
      (error && error.message.includes("Unable to find location"))
    ) {
      throw new Error("Unable to find location. Try another search.");
    } else {
      throw new Error("Unable to connect to location services!");
    }
  }
};


module.exports = {
  geocode,
};
