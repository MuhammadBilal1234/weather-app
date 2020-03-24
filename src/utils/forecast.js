const request = require("request");

forecast = (latitude, longitude, callback) => {
    const url =
        "https://api.darksky.net/forecast/673a60c686830e18dfa890b0bd517806/" +
        latitude +
        "," +
        longitude +
        "?units=si";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Cannot Connect", undefined);
        } else if (body.error) {
            callback("Unable to Connect to Internet", undefined);
        } else {
            callback(
                undefined,
                `It is Currently ${body.currently.temperature}. There is ${body.currently.precipProbability}% chances of Rain. `
            );
        }
    });
};

module.exports = forecast;
