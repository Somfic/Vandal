import { writable, type Writable } from 'svelte/store';
import type { UserInfo } from './userinfo';
import type { Roster } from './roster';
import type { ChatMessage } from './chat';

const users: UserInfo[] = [];
export const speakers = writable(users);

export const roster0: Writable<Roster | undefined> = writable();
export const roster1: Writable<Roster | undefined> = writable();
export const roster2: Writable<Roster | undefined> = writable();
export const roster3: Writable<Roster | undefined> = writable();
export const roster4: Writable<Roster | undefined> = writable();
export const roster5: Writable<Roster | undefined> = writable();
export const roster6: Writable<Roster | undefined> = writable();
export const roster7: Writable<Roster | undefined> = writable();
export const roster8: Writable<Roster | undefined> = writable();
export const roster9: Writable<Roster | undefined> = writable();

export const phase = writable('');

export const messages: Writable<ChatMessage[]> = writable([]);
