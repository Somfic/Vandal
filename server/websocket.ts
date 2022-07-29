import { Server } from "http";
import WebSocket from "ws";
import puppeteer from "puppeteer";

let websocket: WebSocket.Server;
export let speakers = new Map<string, boolean>();

export default async (server: Server) => {
	websocket = new WebSocket.Server({
		noServer: true,
		path: "/ws",
	});

	server.on("upgrade", (req, socket, head) => {
		websocket.handleUpgrade(req, socket, head, client => {});
	});

	// Connect to stream overlay
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(
		"https://streamkit.discord.com/overlay/voice/1002360367558688921/1002360369945260085"
	);
	await page.waitForSelector(".voice-states");

	let oldAmount = 0;

	setInterval(async () => {
		let states = await page.$$(".voice-state");

		if (states.length !== oldAmount) {
			oldAmount = states.length;
			speakers.clear();
		}

		states.forEach(async state => {
			let image = await state.$("img");
			let rawSrc = await image?.getProperty("src");
			let srcSegments = await rawSrc?.evaluate(src => src.split("/"));
			let src = srcSegments?.join("/")!;

			let isTalking = await image?.evaluate(image => image.classList.contains("speaking"));
			speakers.set(src, isTalking!);
		});

		send({ event: "speakers", value: Array.from(speakers.entries()) });
	}, 100);

	return websocket;
};

export function send(data: any) {
	websocket.clients.forEach(client => {
		client.send(JSON.stringify(data));
	});
}
