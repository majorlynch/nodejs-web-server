const request = require('postman-request');

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFqb3JseW5jaCIsImEiOiJjazl1NWJrc20wM2lsM2VwYTRwbDZpczB6In0.F4uHvEjifWR74Mdp4kMGpQ';

    //request({ url: url, json: true }, (error, response) => {
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].location
            })
        }
    })
}

module.exports = geocode;