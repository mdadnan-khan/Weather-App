const request = require("postman-request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

geocode("Satna", (error, data) => {
    console.log("Error", error);
    console.log("Data", data);
});

forecast(24.5822, 80.8248, (error, data) => {
    console.log("Error", error);
    console.log("Data", data);
});
