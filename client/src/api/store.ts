import { writable, type Writable } from 'svelte/store';
import type { UserInfo } from './userinfo';
import type { Roster } from './roster';
import type { ChatMessage } from './chat';
import type { Scoreboard } from './scoreboard';

const users: UserInfo[] = [];
export const speakers = writable(users);

export const roster: Writable<(Roster | undefined)[]> = writable([]);
export const oldRoster: Writable<(Roster | undefined)[]> = writable([]);

export const scoreboard: Writable<(Scoreboard | undefined)[]> = writable([]);
export const oldScoreboard: Writable<(Scoreboard | undefined)[]> = writable([]);

export const score: Writable<{ won: number; lost: number }> = writable({
	won: 0,
	lost: 0
});
export const oldScore: Writable<{ won: number; lost: number }> = writable({
	won: 0,
	lost: 0
});

export const phase = writable('');

export const messages: Writable<ChatMessage[]> = writable([]);
