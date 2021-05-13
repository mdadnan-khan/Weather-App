const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=7576e6d42e2ab8c9e5e7e80ba3478c10&query=" +
        latitude +
        "," +
        longitude +
        "&units=m";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service");
        } else if (body.error) {
            callback("Unable to find location");
        } else {
            const data = body;
            const temp = data.current.temperature;
            const precip = data.current.precip;
            const apparentTemp = data.current.feelslike;
            callback(
                undefined,
                body.current.weather_descriptions[0] +
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
