const request = require("request");

geocode = (address, callback) => {
    const url2 =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        address +
        ".json?access_token=pk.eyJ1IjoibXVoYW1tYWRiaWxhbDEyMyIsImEiOiJjazg0bDczdjcwMnBjM2ZtY3dwenZ0cWhnIn0.EkXIALmbkWcjn5QQfQFc5w&limit=1";
    request({ url: url2, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to Connect", undefined);
        } else if (body.features.length === 0) {
            callback("No Respone", undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[1],
                latitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;
