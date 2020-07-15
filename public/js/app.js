/* eslint-disable no-console */
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherCard = document.querySelector('.weather-card');
const locationInfo = document.querySelector('.location');
const forecastInfo = document.querySelector('.forecast');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        return console.log(data.error);
      }

      const domWeatherIcon = document.querySelector('.icon');

      if (!domWeatherIcon) {
        const iconTag = document.createElement('img');
        iconTag.setAttribute('height', 64);
        iconTag.setAttribute('class', 'icon');
        iconTag.setAttribute('src', data.icon);
        weatherCard.insertBefore(iconTag, locationInfo);
      } else {
        domWeatherIcon.src = data.icon;
      }

      locationInfo.textContent = data.location;
      forecastInfo.textContent = data.forecast;
      weatherCard.classList.add('show');
    });
  });
});
