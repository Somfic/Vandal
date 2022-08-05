import { Server } from "http";
import WebSocket from "ws";
import puppeteer from "puppeteer";

let websocket: WebSocket.Server;
let tracker: WebSocket.WebSocket | undefined;
let client: WebSocket.WebSocket | undefined;

export let speakers = new Map<string, boolean>();

export default async (server: Server) => {
  websocket = new WebSocket.Server({
    noServer: true,
    path: "/ws",
  });

  server.on("upgrade", (req, socket, head) => {
    websocket.handleUpgrade(req, socket, head, (socket) => {
      socket.on("message", async (message) => {
        let data = JSON.parse(message.toString());
        if (data.identity === "tracker") {
          console.log("tracker connected");

          tracker = socket;

          tracker.onclose = () => {
            console.log("tracker disconnected");
          };

          tracker.onmessage = (message) => {
            console.log(message.data);
            client?.send(
              JSON.stringify({
                event: "in-game",
                value: message.data.toString(),
              })
            );
          };
        }
        if (data.identity === "client") {
          console.log("client connected");

          client = socket;

          client.onclose = () => {
            console.log("client disconnected");
          };
        }
      });
    });
  });

  // Connect to stream overlay
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://streamkit.discord.com/overlay/voice/1002360367558688921/1002595464023122021"
  );
  await page.waitForSelector(".voice-states");

  let oldAmount = 0;

  setInterval(async () => {
    let states = await page.$$(".voice-state");

    if (states.length !== oldAmount) {
      oldAmount = states.length;
      speakers.clear();
    }

    await (async () => {
      states.forEach(async (state) => {
        let image = await state.$("img");
        let rawSrc = await image?.getProperty("src");
        let srcSegments = await rawSrc?.evaluate((src) => src.split("/"));
        let src = srcSegments?.join("/")!;

        let isTalking = await image?.evaluate((image) =>
          image.classList.contains("speaking")
        );
        speakers.set(src, isTalking!);
      });
    })();

    send({ event: "speakers", value: Array.from(speakers.entries()) });
  }, 100);

  return websocket;
};

export function send(data: any) {
  websocket.clients.forEach((client) => {
    client.send(JSON.stringify(data));
  });
}
