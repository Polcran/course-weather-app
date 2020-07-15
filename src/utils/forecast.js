const request = require('postman-request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=bfd731b155708a65967da9f9846d1f0b&query=${lat},${long}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect', undefined, undefined);
    } else if (body.error) {
      callback(body.error.info, undefined, undefined);
    } else {
      const { temperature, feelslike } = body.current;
      const data = {
        weather: body.current.weather_descriptions[0],
        weatherIcon: body.current.weather_icons[0],
        temperature,
        feelslike,
      };
      callback(undefined, `The weather right now is ${data.weather}. The temperaute is ${data.temperature}º and it's feels like ${data.feelslike}º`, data.weatherIcon);
    }
  });
};

module.exports = forecast;
