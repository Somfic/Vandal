export class UserInfo {
	constructor(discordId: string, valorantId: string, color: string) {
		this.discordId = discordId;
		this.valorantId = valorantId;
		this.color = color;
	}

	discordId: string;
	color: string;
	valorantId: string;
	image = '';
	isTalking = false;
}

export const users = [
	new UserInfo('226075562555211776', 'ΗΞЯΘßRΙИΞ #steve', '#FDC05D'),
	new UserInfo('522833667391881217', 'Honeybee #2310', '#426A5A'),
	new UserInfo('173411644913876992', 'maurice13f #EUW', '#2E2836')
];

export function getUserInfo(id: string, isTalking: boolean): UserInfo {
	const user = users.find((user) => id.includes(user.discordId)) ?? new UserInfo('', '', '');
	user.isTalking = isTalking;
	user.image = id;
	return user;
}
