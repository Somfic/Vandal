<script>
	import { speakers } from '../api/store';

	import { onMount } from 'svelte';
	import { connect } from '../api/websocket';

	onMount(async () => {
		connect('ws://localhost:3000/ws');
	});

	export let size = 'big';
</script>

<div class="wrapper">
	<div class={'speakers ' + size}>
		{#each $speakers as speaker}
			<div class={'speaker ' + (speaker.isTalking ? 'speaking' : 'silent') + ' ' + size}>
				<img
					class={size}
					src={speaker.image + '?size=2048'}
					style={'border-color: ' + speaker.color + ';'}
					alt=""
				/>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
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
			-webkit-backdrop-filter: saturate(180%) blur(80px);
			backdrop-filter: saturate(180%) blur(80px);
		}

		.speaker {
			opacity: 0.8;
			transition: all 500ms ease;
			border-radius: 1000px;
			filter: saturate(0.7);

			&.small {
				opacity: 0.9;

				&.speaking {
					transform: scale(1.2);
				}
			}

			&.speaking {
				opacity: 1;
				transform: scale(1.1);
			}

			img {
				border: 3px solid;
				border-radius: 1000px;
				box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.228);

				&.big {
					width: 170px;
					height: 170px;
					margin: 20px;
				}

				&.small {
					width: 60px;
					height: 60px;
					margin: 10px;
				}
			}
		}
	}
</style>
