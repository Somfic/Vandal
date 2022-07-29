import puppeteer from "puppeteer";

import express from "express";
import cors from "cors";

import websocket from "./websocket";

const app = express();
const port = 3000;

app.use(cors());

(async () => {
	const browser = await puppeteer.launch();

	app.get("/puppeteer", (req, res) => {
		res.send({ url: browser.wsEndpoint() });
	});

	let server = app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
	});

	websocket(server);
})();
