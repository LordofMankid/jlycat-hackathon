const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const puppeteer = require('puppeteer');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post('/', function (req, res) {
    const requestBody = req.body;
    console.log('Received: ', requestBody);
    const { firstName, lastName, month, day, year, zipCode } = requestBody;

    puppeteer
        .launch({
            headless: true,
            args: [
                '--ignore-certificate-errors',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
            ],
        })
        .then(async function (browser) {
            const page = await browser.newPage();
            await page.setUserAgent(
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36'
            );
            await page.goto('https://www.sec.state.ma.us/VoterRegistrationSearch/MyVoterRegStatus.aspx');
            await page.waitForSelector('#MainContent_txtFirstName');

            // Fill out the form fields
            await page.type('#MainContent_txtFirstName', firstName);
            await page.type('#MainContent_txtLastName', lastName);
            await page.select('#MainContent_ddlMonth', month);
            await page.select('#MainContent_ddlDay', day);
            await page.select('#MainContent_ddlYear', year);
            await page.type('#MainContent_txtZip', zipCode);
            await page.click('#MainContent_chkUnderstand');
            console.log('Finished filling out form');

            // Click on the submit button
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
                page.click('#MainContent_btnSearch'),
            ]);
            console.log('Navigation to next page done');

            // Find voter status on next page
            const voterStatus = await page.$eval('#MainContent_lblStatus', (element) =>
                element.textContent.trim()
            );
            console.log('Voter Status:', voterStatus);

            await browser.close();

            // Send voter registration status back to client
            res.send({
                status: voterStatus,
                message: 'Managed to get voter status!',
            });
        })
        .catch((error) => {
            console.error('Error processing data:', error);
            res.status(500).send({
                status: 'nil',
                message: 'Failed to get voter status.',
            });
        });
});

app.listen(4321, function () {
    console.log('Running on port 4321.');
});