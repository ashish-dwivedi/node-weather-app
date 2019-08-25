const request = require('request');

const forecast = (longitude, lattitude, callback) => {
    let url = `https://api.darksky.net/forecast/872a276c48e2dffa39c48a046ec3af1f/${longitude},${lattitude}?units=si`;
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Cannot connect to the weather services!');
        } else if (body.error) {
            callback('Invalid location. Please try again');
        } else {
            console.log(body.daily.data[0]);
            callback(undefined, {
                summary: `${ body.daily.data[0].summary } It is currently ${ body.currently.temperature } degrees out.
                    There is a ${ body.currently.precipProbability } % chance of rain. Maximum temperature will be
                    ${ body.daily.data[0].temperatureMax } and the minimum will be ${ body.daily.data[0].temperatureMin }`,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            });
        }
    })
}

module.exports = forecast;