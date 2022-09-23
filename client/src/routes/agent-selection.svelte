<script lang="ts">
	import Roster from '../components/Roster.svelte';
	import Voice from '../components/Voice.svelte';

	import { roster } from '../api/store';

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

<div class="wrapper">
	<video class={hide ? 'hide' : ''} src="/videos/hs.mp4" autoplay muted loop />

	<div class={'rosters ' + (hide ? 'hide' : '')}>
		{#each $roster as agent}
			{#if agent != undefined && agent.teammate}
				<div class="roster">
					<Roster roster={agent} />
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../styles/colors';

	* {
		overflow: hidden;
	}

	.wrapper {
		background-color: $dark;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	.voice {
		position: absolute;
		z-index: 1;
		width: 100vw;
		top: 40px;
	}

	video {
		position: absolute;
		object-fit: cover;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		filter: saturate(1.2);
		transition: all 4s ease;
		overflow: hidden;

		&.hide {
			opacity: 0;
		}
	}

	.rosters {
		position: absolute;
		display: flex;
		width: 100vw;
		bottom: 0;
		left: 0;
		justify-content: space-evenly;
		gap: 2rem;

		.roster {
			transition: all 1s ease;

			@for $i from 0 to 10 {
				&:nth-child(#{$i}) {
					transition-delay: $i * 0.2s;
				}
			}
		}

		&.hide .roster {
			opacity: 0;
			transform: translateY(400px);
		}
	}
</style>
