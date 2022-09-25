<script lang="ts">
	import { onMount } from 'svelte';
	import { connect } from '../api/websocket';
	import { phase, scoreboard } from '../api/store';
	import Voice from '../components/Voice.svelte';
	import BuyOverview from '../components/BuyOverview.svelte';
	import RoundEnd from '../components/RoundEnd.svelte';

	onMount(async () => {
		connect('ws://localhost:3000/ws');
	});
</script>

<div class="voice">
	<Voice size="small" />
</div>

<!-- {#if $phase == 'shopping'} -->
<div class="buy">
	<BuyOverview players={$scoreboard} />
</div>

<div class="round-end" class:shopping={$phase == 'shopping'} class:combat={$phase == 'combat'}>
	<RoundEnd />
</div>

<!-- {/if} -->
<style lang="scss">
	@import '../styles/colors';

	.voice {
		position: absolute;
		z-index: 2;
		right: -10px;
		top: -10px;
	}

	.buy {
		position: absolute;
		z-index: 2;
		bottom: 100px;
		left: 50px;
	}

	.round-end {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: $dark;

		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		transform: translateX(0vw);
		transition: transform 500ms ease;
		transition-delay: 2s;

		&.shopping {
			transform: translateX(-100vw);
			transition-delay: 0s;
		}

		&.combat {
			transform: translateX(100vw);
			opacity: 0;
			transition-delay: 0s;
		}
	}
</style>
