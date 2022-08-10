<script lang="ts">
	import Roster from '../components/Roster.svelte';
	import Voice from '../components/Voice.svelte';

	import {
		roster0,
		roster1,
		roster2,
		roster3,
		roster4,
		roster5,
		roster6,
		roster7,
		roster8,
		roster9
	} from '../api/store';

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
	<div class="voice">
		<Voice />
	</div>

	<video class={hide ? 'hide' : ''} src="/videos/hs.mp4" autoplay muted loop />

	<div class={'rosters ' + (hide ? 'hide' : '')}>
		{#if $roster0 != undefined}
			<div class="roster">
				<Roster roster={$roster0} />
			</div>
		{/if}

		{#if $roster1 != undefined}
			<div class="roster">
				<Roster roster={$roster1} />
			</div>
		{/if}

		{#if $roster2 != undefined}
			<div class="roster">
				<Roster roster={$roster2} />
			</div>
		{/if}

		{#if $roster3 != undefined}
			<div class="roster">
				<Roster roster={$roster3} />
			</div>
		{/if}

		{#if $roster4 != undefined}
			<div class="roster">
				<Roster roster={$roster4} />
			</div>
		{/if}
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
