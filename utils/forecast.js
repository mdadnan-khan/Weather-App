const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=7576e6d42e2ab8c9e5e7e80ba3478c10&query=" +
        latitude +
        "," +
        longitude +
        "&units=m";

    console.log(url);

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service");
        } else if (response.body.error) {
            callback("Unable to find location");
        } else {
            const data = response.body;
            const temp = data.current.temperature;
            const precip = data.current.precip;
            const apparentTemp = data.current.feelslike;
            callback(
                undefined,
                response.body.current.weather_descriptions[0] +
                    ". It is currently " +
                    temp +
                    " degrees out. There is a " +
                    precip +
                    "% chance of rain. It feels like " +
                    apparentTemp +
                    " degrees right now."
            );
        }
    });
};

module.exports = forecast;
