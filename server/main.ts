import puppeteer from "puppeteer";

import express from "express";
import cors from "cors";
import { send } from "./websocket";

import websocket from "./websocket";
import tmi, { Client } from "tmi.js";

const app = express();
let client: Client;
const port = 3000;

app.use(cors());

(async () => {
  let server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  client = new tmi.Client({
    options: { debug: true },
    identity: {
      username: "justinfan000",
      password: "",
    },
    channels: ["notyetnamed3"],
  });
  client.connect().catch(console.error);
  client.on("message", (channel, tags, message, self) => {
    send({
      event: "twitch-chat",
      value: {
        id: new Date().toISOString(),
        channel: channel,
        tags: tags,
        message: message,
      },
    });
  });

  websocket(server);
})();
