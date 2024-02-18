const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post('/getInfoForLocation', function (req, res) {
    const civicApi = google.civicinfo({
        version: 'v2',
        auth: apiKey,
    });

    try {
        const response = civicApi.elections.voterInfoQuery({
            address: encodeURIComponent(address),
        })

        setCivicData(response.data);
    } catch (error) {
        console.log(encodeURIComponent(address));
        console.error('Error fetching Civic Information:', error.message);
    }
});

app.listen(4321, function () {
    console.log('Running on port 4321.');
}); 