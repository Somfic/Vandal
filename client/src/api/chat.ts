export interface ChatMessage {
	is_new: boolean;
	id: string;
	channel: string;
	tags: Tags;
	message: string;
}

export interface Tags {
	'badge-info': null;
	badges: null;
	'client-nonce': string;
	color: string;
	'display-name': string;
	emotes: null;
	'first-msg': boolean;
	flags: null;
	id: string;
	mod: boolean;
	'returning-chatter': boolean;
	'room-id': string;
	subscriber: boolean;
	'tmi-sent-ts': string;
	turbo: boolean;
	'user-id': string;
	'user-type': null;
	'emotes-raw': null;
	'badge-info-raw': null;
	'badges-raw': null;
	username: string;
	'message-type': string;
}
