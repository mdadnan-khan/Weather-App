const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geocode = require("../../utils/geocode");
const forecast = require("../../utils/forecast");
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Adnan Khan",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Adnan Khan",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "This is some helpful text.",
        title: "Help",
        name: "Adnan Khan",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "You must provide an address",
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return console.log(error);
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                console.log(error);
            }

            res.send({
                forecast: forecastData,
                location: location,
            });
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Adnan Khan",
        errorMessage: "Help article not found.",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Adnan Khan",
        errorMessage: "Page not found.",
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
