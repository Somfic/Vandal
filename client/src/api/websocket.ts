import { speakers } from './store';
import { getUserInfo } from './userinfo';
import { goto } from '$app/navigation';

let socket: WebSocket;

export function connect(url: string) {
	socket = new WebSocket(url);

	socket.onopen = () => {
		console.log('connected');
		socket.send(JSON.stringify({ identity: 'client' }));
	};

	socket.onmessage = (message) => {
		const data = JSON.parse(message.data);
		const event = data.event;
		const rawValue = data.value;

		switch (event) {
			case 'speakers': {
				const rawInfos = (rawValue as [[string, boolean]]).map(([id, isTalking]) => ({
					id,
					isTalking
				}));
				const infos = rawInfos.map((info) => getUserInfo(info.id, info.isTalking));
				speakers.set(infos);
				break;
			}

			case 'in-game': {
				const value = JSON.parse(rawValue);
				console.log(value);

				if (value['game_info']) {
					if (value['game_info']['scene']) {
						const scene = value['game_info']['scene'];
						console.log('Switching game scene to', scene);
						switch (scene) {
							case 'Init':
							case 'MainMenu': {
								goto('/break');
								break;
							}
						}
					}
				}

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

		setTimeout(function () {
			connect(url);
		}, 1000);
	};

	socket.onerror = (err) => {
		console.error('Socket encountered error: ', err, 'Closing socket');
		socket.close();
	};
}
