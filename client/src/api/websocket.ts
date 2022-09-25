import {
	messages,
	oldRoster,
	oldScore,
	oldScoreboard,
	phase,
	roster,
	scoreboard,
	speakers,
	score
} from './store';
import { getUserInfo } from './userinfo';
import { goto } from '$app/navigation';
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
								oldScore.set({ won: 0, lost: 0 });
								score.set({ won: 0, lost: 0 });
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
								oldScore.set({ won: 0, lost: 0 });
								score.set({ won: 0, lost: 0 });
								redirect('/map?=' + scene.toLowerCase());
								break;

							case 'CharacterSelectPersistentLevel':
								for (let index = 0; index < 10; index++) {
									roster.update((r) => {
										r[index] = undefined;
										return r;
									});
								}
								redirect('/agent-selection');
								break;
						}
					}
				}

				if (value['match_info']) {
					for (let index = 0; index < 10; index++) {
						if (value['match_info']['roster_' + index]) {
							const parsed = JSON.parse(value['match_info']['roster_' + index]);
							roster.update((r) => {
								r[index] = parsed;
								return r;
							});
						}

						if (value['match_info']['scoreboard_' + index]) {
							const parsed = JSON.parse(value['match_info']['scoreboard_' + index]);
							scoreboard.update((s) => {
								s[index] = parsed;
								return s;
							});
						}
					}

					if (value['match_info']['score']) {
						const parsed = JSON.parse(value['match_info']['score']);
						score.set(parsed);
					}

					if (value['match_info']['round_phase']) {
						setTimeout(() => {
							redirect('/game');
						}, 1000); // wait 1 second for screen to load

						const phaseValue = value['match_info']['round_phase'];

						if (phaseValue === 'shopping') {
							setTimeout(() => {
								oldRoster.set(get(roster));
								oldScoreboard.set(get(scoreboard));
							}, 1000);
						}

						if (phaseValue === 'shopping') {
							setTimeout(() => {
								oldScore.set(get(score));
							}, 1000);
						}

						phase.set(phaseValue);
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
