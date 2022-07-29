export class UserInfo {
	constructor(id: string, name: string, color: string) {
		this.id = id;
		this.name = name;
		this.color = color;
	}

	id: string;
	color: string;
	name: string;
	isTalking = false;
}

const users = [
	new UserInfo('226075562555211776', 'Herobrine', '#FDC05D'),
	new UserInfo('522833667391881217', 'Honeybee', '#426A5A'),
	new UserInfo('173411644913876992', 'Maurice', '#2E2836')
];

export function getUserInfo(id: string, isTalking: boolean): UserInfo {
	const user = users.find((user) => user.id === id) ?? new UserInfo('', '', '');
	user.isTalking = isTalking;
	return user;
}
