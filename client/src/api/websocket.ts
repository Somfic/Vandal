import { speakers } from './store';
import { getUserInfo } from './userinfo';

let socket: WebSocket;

export function connect(url: string) {
	socket = new WebSocket(url);

	socket.onopen = () => {
		console.log('connected');
	};

	socket.onmessage = (message) => {
		const data = JSON.parse(message.data);
		const event = data.event;
		const value = data.value;

		switch (event) {
			case 'speakers': {
				const rawInfos = (value as [[string, boolean]]).map(([id, isTalking]) => ({
					id,
					isTalking
				}));
				const infos = rawInfos.map((info) => getUserInfo(info.id, info.isTalking));
				speakers.set(infos);
				break;
			}

			default: {
				console.log(`Unknown event: ${event}`);
				break;
			}
		}
	};

	socket.onclose = () => {
		console.log('disconnected');
	};
}
