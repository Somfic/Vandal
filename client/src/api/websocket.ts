import {
	messages,
	phase,
	roster0,
	roster1,
	roster2,
	roster3,
	roster4,
	roster5,
	roster6,
	roster7,
	roster8,
	roster9,
	speakers
} from './store';
import { getUserInfo } from './userinfo';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { map } from './translator';
import { get } from 'svelte/store';
import type { ChatMessage } from './chat';

let socket: WebSocket;
let isConnected = false;

export function connect(url: string) {
	if (isConnected) return;

	socket = new WebSocket(url);

	socket.onopen = () => {
		console.log('connected');
		isConnected = true;
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
						const scene = map(value['game_info']['scene']);
						console.log('Switching game scene to', scene);
						switch (scene) {
							case 'Init':
							case 'MainMenu': {
								redirect('/break');
								break;
							}

							case 'Pearl':
							case 'Split':
							case 'Icebox':
							case 'Haven':
							case 'Fracture':
							case 'Breeze':
							case 'Ascent':
							case 'Bind':
								redirect('/map?=' + scene.toLowerCase());
								break;

							case 'CharacterSelectPersistentLevel':
								roster0.set(undefined);
								roster1.set(undefined);
								roster2.set(undefined);
								roster3.set(undefined);
								roster4.set(undefined);
								roster5.set(undefined);
								roster6.set(undefined);
								roster7.set(undefined);
								roster8.set(undefined);
								roster9.set(undefined);
								redirect('/agent-selection');
								break;
						}
					}
				}

				if (value['match_info']) {
					if (value['match_info']['roster_0']) {
						roster0.set(JSON.parse(value['match_info']['roster_0']));
					}

					if (value['match_info']['roster_1']) {
						roster1.set(JSON.parse(value['match_info']['roster_1']));
					}

					if (value['match_info']['roster_2']) {
						roster2.set(JSON.parse(value['match_info']['roster_2']));
					}

					if (value['match_info']['roster_3']) {
						roster3.set(JSON.parse(value['match_info']['roster_3']));
					}

					if (value['match_info']['roster_4']) {
						roster4.set(JSON.parse(value['match_info']['roster_4']));
					}

					if (value['match_info']['roster_5']) {
						roster5.set(JSON.parse(value['match_info']['roster_5']));
					}

					if (value['match_info']['roster_6']) {
						roster6.set(JSON.parse(value['match_info']['roster_6']));
					}

					if (value['match_info']['roster_7']) {
						roster7.set(JSON.parse(value['match_info']['roster_7']));
					}

					if (value['match_info']['roster_8']) {
						roster8.set(JSON.parse(value['match_info']['roster_8']));
					}

					if (value['match_info']['roster_9']) {
						roster9.set(JSON.parse(value['match_info']['roster_9']));
					}

					if (value['match_info']['round_phase']) {
						if (value['match_info']['round_phase'] === 'game_start') {
							redirect('/game');
						}

						phase.set(value['match_info']['round_phase']);
					}
				}

				break;
			}

			case 'twitch-chat': {
				const chat = rawValue as ChatMessage;
				const chats = get(messages);

				if (chats.find((x) => x.id == chat.id) == undefined) {
					chat.is_new = true;
					messages.update((messages) => [...messages, rawValue]);
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
		isConnected = false;

		setTimeout(function () {
			connect(url);
		}, 1000);
	};

	socket.onerror = (err) => {
		console.error('Socket encountered error: ', err, 'Closing socket');
		socket.close();
	};
}

function redirect(url: string) {
	console.log(window.location.host);

	if (!window.location.toString().endsWith('chat')) {
		goto(url);
	}
}
