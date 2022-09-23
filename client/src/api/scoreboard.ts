export interface Scoreboard {
	name: string;
	character: string;
	teammate: boolean;
	alive: boolean;
	kills: number;
	deaths: number;
	assists: number;
	money: number;
	is_local: boolean;
}
