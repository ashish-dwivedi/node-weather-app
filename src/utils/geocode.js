const request = require('request');

const geocode = (address, callback) => {
    const location = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYXNoZGl3cyIsImEiOiJjanlmdjQ2MHowZmZhM2hvNmt4M2cxYXRhIn0.0zNQQw4tyB_dXpheNtG6Xw&limit=1`;

    request({ url, json: true }, ( error, { body } ) => {
        if (error) {
            callback('Unable to connect to location services!');
        } else if (!body.features.length) {
            callback('Unable to find location. Try another search.');
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                lattitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    })
};

module.exports = geocode;