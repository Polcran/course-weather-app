const request = require('postman-request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmxpdG8xMzgiLCJhIjoiY2tjYzFtenVoMDBkZjJ6bnZ6eXVmdTdkOSJ9.Xzr-1VVmkR0UUmHyus16bQ&limit=1&language=es`

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect!!!', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location!!!', undefined)
    } else {
      const data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      }
      callback(undefined, data)
    }
  })
}

module.exports = geocode