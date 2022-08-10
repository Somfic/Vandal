<script>
	import { speakers } from '../api/store';

	import { onMount } from 'svelte';
	import { connect } from '../api/websocket';

	let hide = true;

	onMount(async () => {
		connect('ws://localhost:3000/ws');

		setTimeout(() => {
			hide = false;
		}, 100);
	});
</script>

<div class="speakers">
	{#each $speakers as speaker}
		<div class={'speaker-wrapper ' + (hide ? 'hide' : '')}>
			<div
				class={'speaker ' + (speaker.isTalking ? 'speaking' : 'silent')}
				style={'background-color: ' + speaker.color + ';'}
			>
				<img src={speaker.image + '?size=2048'} alt="" />
			</div>
		</div>
	{/each}
	{#if $speakers.length === 0}
		<div class="speaker">
			<img class="default" src="/images/agents/.png" alt="" />
		</div>
	{/if}
</div>

<style lang="scss">
	@import '../styles/colors';

	.speakers {
		display: flex;
		flex-grow: 1;
		align-items: center;
		justify-content: space-evenly;
		min-width: 100%;
		min-height: 100%;
		overflow: hidden;
	}

	.speaker-wrapper {
		flex-grow: 1;
		transition: all 1s ease;

		@for $i from 0 to 10 {
			&:nth-child(#{$i}) {
				transition-delay: $i * 0.2s;
			}
		}

		&.hide {
			opacity: 0;
			transform: translateY(400px);
		}
	}

	.speaker {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
		width: 100%;
		height: 100vh;
		box-shadow: inset 5px -10px 20px 0px rgba(0, 0, 0, 0.25);
		transition: all 500ms ease;
		background-color: $dark;

		img {
			border: 2px solid transparentize($dark, 0.5);
		}

		&.silent {
			filter: brightness(0.9);
		}

		&.silent img {
			opacity: 0.7;
			filter: saturate(0.8);
		}

		&.speaking img {
			transform: scale(1.2);
		}
	}

	img {
		border-radius: 100%;
		transition: all 500ms ease;
		box-shadow: 10px 10px 19px 0px rgba(0, 0, 0, 0.25);
		max-width: 256px;
		min-width: 1rem;
		margin: 5rem;
	}
</style>
