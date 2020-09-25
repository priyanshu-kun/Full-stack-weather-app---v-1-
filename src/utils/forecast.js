const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?query=${latitude},${longitude}&access_key=19d78df8271bb6502f346271ab28611e`

    request({ url, json: true }, (error, { body } = {}) => {
        
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current)
        }
    })
}

module.exports = forecast