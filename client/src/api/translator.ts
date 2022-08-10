export function agent(name: string | undefined | null) {
	if (name === undefined || name === null) {
		return 'Unknown';
	}

	switch (name.toLowerCase()) {
		case 'clay':
			return 'Raze';

		case 'pandemic':
			return 'Viper';

		case 'wraith':
			return 'Omen';

		case 'hunter':
			return 'Sova';

		case 'thorne':
			return 'Sage';

		case 'phoenix':
			return 'Phoenix';

		case 'wushu':
			return 'Jett';

		case 'gumshoe':
			return 'Cypher';

		case 'sarge':
			return 'Brimstone';

		case 'breach':
			return 'Breach';

		case 'vampire':
			return 'Reyna';

		case 'killjoy':
			return 'Killjoy';

		case 'guide':
			return 'Skye';

		case 'stealth':
			return 'Yoru';

		case 'rift':
			return 'Astra';

		case 'grenadier':
			return 'KAYO';

		case 'deadeye':
			return 'Chamber';

		case 'sprinter':
			return 'Neon';

		case 'bountyhunter':
			return 'Fade';

		default:
			return name;
	}
}

export function map(name: string | undefined | null) {
	if (name === undefined || name === null) {
		return 'Unknown';
	}

	switch (name.toLowerCase()) {
		case 'triad':
			return 'Haven';

		case 'duality':
			return 'Bind';

		case 'bonsai':
			return 'Split';

		case 'ascent':
			return 'Ascent';

		case 'port':
			return 'Icebox';

		case 'foxtrot':
			return 'Breeze';

		case 'canyon':
			return 'Fracture';

		case 'pitt':
			return 'Pearl';

		default:
			return name;
	}
}
