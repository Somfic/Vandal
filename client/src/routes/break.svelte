<script>
	import { speakers } from '../api/store';

	import { onMount } from 'svelte';

	import { connect } from '../api/websocket';
	onMount(async () => {
		connect('ws://localhost:3000/ws');
	});
</script>

<div class="speakers">
	{#each $speakers as speaker}
		<div
			class={'speaker ' + (speaker.isTalking ? 'speaking' : 'silent')}
			style={'background-color: ' + speaker.color + ';'}
		>
			<img src={speaker.image + '?size=2048'} alt="" />
		</div>
	{/each}
	{#if $speakers.length === 0}
		<div class="speaker">
			<h1>Henlo</h1>
		</div>
	{/if}
</div>

<style lang="scss">
	.speakers {
		display: flex;
		flex-grow: 1;
		align-items: center;
		justify-content: space-evenly;
		min-width: 100%;
		min-height: 100%;
	}

	.speaker {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
		width: 100%;
		height: 100vh;
		box-shadow: inset 5px -10px 20px 0px rgba(0, 0, 0, 0.25);

		&.silent img {
			opacity: 0.7;
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
