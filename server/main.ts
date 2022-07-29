import puppeteer from 'puppeteer';

import express from 'express';
const app = express();
const port = 3000;

(async () => {
    const browser = await puppeteer.launch();

    app.get('/puppeteer', (req, res) => {
       res.send(browser.wsEndpoint())
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
})();