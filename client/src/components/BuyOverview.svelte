<script lang="ts">
	import { agent } from '../api/translator';
	import type { Scoreboard } from '../api/scoreboard';
	import { users } from '../api/userinfo';
	import { phase } from '../api/store';

	export let players: (Scoreboard | undefined)[];
</script>

<div class="buy">
	<div class="team">
		{#each players.filter((x) => x && x.teammate && users.filter((y) => y.valorantId == x?.name).length > 0) as player, index}
			<div
				class="player"
				class:show={$phase == 'shopping'}
				style={'border-color: ' +
					users.filter((x) => x.valorantId == player?.name)[0]?.color +
					';transition-delay:' +
					index * 0.3 +
					's'}
			>
				<img
					class="agent"
					alt={agent(player?.character)}
					src={'images/agents/' + agent(player?.character).toLowerCase() + '.png'}
					style={'background:' + users.filter((x) => x.valorantId == player?.name)[0]?.color}
				/>
				<p class="name">{player?.name.split('#')[0]}</p>
				<div
					class="kd"
					class:show={(player?.kills ?? 0) + (player?.deaths ?? 0) + (player?.assists ?? 0) > 0}
				>
					<span class="kills">{player?.kills}</span>
					/
					<span class="deaths">{player?.deaths}</span>
					/
					<span class="assists">{player?.assists}</span>
				</div>
			</div>
		{/each}
	</div>

	<div class="team" />
</div>

<style lang="scss">
	@import '../styles/colors.scss';

	.buy {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.team {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.player {
		display: flex;
		align-items: center;
		gap: 1rem;
		background-color: transparentize($dark, 0.1);
		color: transparentize(white, 0.2);
		padding: 0rem 0.5rem;
		border: 5px solid transparentize($dark, 0.8);
		border-radius: 1rem;
		opacity: 0;
		transform: translateX(-150px);
		transition: all 500ms ease;

		&.show {
			opacity: 1;
			transform: translateX(0);
		}

		.agent {
			width: 3rem;
			height: 3rem;
			border-radius: 100px;
			border: 2px solid transparentize($dark, 0.8);
			background-color: black;
		}

		.name {
			font-size: 1.5rem;
			font-weight: 600;
			width: 200px;
			color: white;
		}

		.kd {
			color: transparentize(white, 0.9);
			padding-right: 0.5rem;
			opacity: 0;

			&.show {
				opacity: 1;
			}

			.deaths {
				color: rgb(228, 80, 80);
			}

			.kills {
				color: rgb(109, 207, 109);
			}

			.assits {
				color: rgb(162, 162, 162);
			}

			span {
				color: transparentize(white, 0.2);
				font-weight: 600;
			}
		}
	}
</style>
