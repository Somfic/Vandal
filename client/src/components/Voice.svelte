<script lang="ts">
	import { oldScoreboard, scoreboard, speakers } from '../api/store';

	import { onMount } from 'svelte';
	import { connect } from '../api/websocket';

	onMount(async () => {
		connect('ws://localhost:3000/ws');
	});

	export let discordId: string | undefined = undefined;
	export let size = 'big';
</script>

<div class="wrapper">
	<div class={'speakers ' + size}>
		{#each $speakers as speaker}
			{#if discordId == undefined || (discordId != undefined && speaker.discordId == discordId)}
				<div
					class={'speaker ' + (speaker.isTalking ? 'speaking' : 'silent') + ' ' + size}
					class:dead={!$scoreboard.filter((x) => x?.name == speaker.valorantId)[0]?.alive ?? false}
				>
					<img
						class={size}
						src={speaker.image + '?size=2048'}
						style={'border-color: ' + speaker.color + ';'}
						alt=""
					/>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../styles/colors';

	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
	}

	.speakers {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 1000px;

		&.big {
			background-color: transparentize($dark, 0.1);
			border: 2px solid transparentize($dark, 0.8);
		}

		.speaker {
			transition: all 500ms ease;
			border-radius: 1000px;
			filter: saturate(0.7);
			z-index: 10;

			&.speaking {
				transform: scale(1.2);
				filter: saturate(1);
			}

			&.dead {
				img.small {
					filter: grayscale(1);
				}
			}

			img {
				border: 5px solid;
				border-radius: 1000px;
				box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.228);
				transition: 1s ease;

				&.small {
					width: 70px;
					height: 70px;
					margin: 10px;
				}

				&.medium {
					width: 140px;
					height: 140px;
					margin: 15px;
				}

				&.big {
					width: 170px;
					height: 170px;
					margin: 20px;
				}
			}
		}
	}
</style>
