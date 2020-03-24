const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

const publicpathDirectory = path.join(__dirname, "../public");
const viewpath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partial");

console.log(viewpath, partialpath);

app.set("view engine", "hbs");
app.set("views", viewpath);
hbs.registerPartials(partialpath);

//Main Page

app.use(express.static(publicpathDirectory));

//Help Page

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Muhammad Ali"
    });
});

//About Page

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Muhammad Bilal"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        helptext: "some Helpful Text",
        name: "Muhammad Talha"
    });
});

//Weather Page

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please Enter Address"
        });
    }

    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error: error
                });
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    });
                }

                res.send({
                    latitude,
                    longitude,
                    location,
                    forecastData
                });
            });
        }
    );
});

// app.get("/products", (req, res) => {
//     console.log(req.query);
//     res.send({
//         product: []
//     });
// });

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Muhammad Bilal",
        errormessage: "Not Found"
    });
});

app.listen(3000, () => {
    console.log("Listening on 3000 port Server");
});
