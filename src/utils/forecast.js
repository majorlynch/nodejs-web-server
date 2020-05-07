const request = require('postman-request');

// const url = 'http://api.weatherstack.com/current?access_key=bd74629824fba375d0f851e6ea28cfb0&query=51.8503,-8.2943&units=m';

// request({ url: url, json: true }, (error, response) => {
//     //console.log(response);
//     //const data = JSON.parse(response.body);
//     //console.log(response.body.current)

//     if (error) {
//         console.log(chalk.red('Unable to connect to weather service'));
//     }
//     else if (response.body.error) {
//         console.log(chalk.red('Unable to find location'));
//     }
//     else {
//         console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degress out');
//     }
// })

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=bd74629824fba375d0f851e6ea28cfb0&query=' + latitude + ',' + longitude + '&units=m';

    //request({ url: url, json: true }, (error, response) => {
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degress out');
        }
    })
}


module.exports = forecast;