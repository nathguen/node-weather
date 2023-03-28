console.log('client-side js has loaded')

const fetchWeather = async (address) => {
  const resp = await fetch(`http://localhost:3000/weather?address=${address}`)
  const data = await resp.json();
  return data;
};

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const getWeatherButton = document.querySelector('#get-weather-button');


/**
 * Invokes the fetchWeather function and displays the results
 * @param {Event} e 
 */
const getWeather = async (e) => {
  try {
    e.preventDefault();
    const location = search.value;

    message1.textContent = 'Loading...';
    message2.textContent = '';

    const data = await fetchWeather(location);
    if (data.location && data.forecast) {
      message1.textContent = data.location;
      message2.textContent = data.forecast;
    } else if (data.error) {
      throw new Error(data.error);
    } else {
      throw new Error('Oops! Something went wrong.');
    }

  } catch (error) {
    if (error.message === 'Failed to fetch') {
      message1.textContent = 'Unable to connect to weather service';
      message2.textContent = '';
      return;
    }

    message1.textContent = error.message;
    message2.textContent = '';
  }
};


getWeatherButton.addEventListener('click', getWeather);
weatherForm.addEventListener('submit', getWeather);
