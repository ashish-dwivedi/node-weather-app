const request = require('request');

const forecast = (longitude, lattitude, callback) => {
    let url = `https://api.darksky.net/forecast/872a276c48e2dffa39c48a046ec3af1f/${longitude},${lattitude}?units=si`;
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Cannot connect to the weather services!');
        } else if (body.error) {
            callback('Invalid location. Please try again');
        } else {
            callback(undefined, {
                summary: `${ body.daily.data[0].summary } It is currently ${ body.currently.temperature } degrees out. There is a ${ body.currently.precipProbability } % chance of rain.`,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            });
        }
    })
}

module.exports = forecast;