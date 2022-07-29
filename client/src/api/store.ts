import { writable } from 'svelte/store';
import type { UserInfo } from './userinfo';

const users: UserInfo[] = [];
export const speakers = writable(users);
