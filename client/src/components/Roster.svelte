<script lang="ts">
	import type { Roster } from '../api/roster';
	import { agent as translate } from '../api/translator';

	export let roster: Roster | undefined;
</script>

<div class={'roster'}>
	{#if roster != undefined}
		<h1>{translate(roster.character)}</h1>
		<img
			class={roster.locked ? 'locked' : 'not-locked'}
			src={'/images/agents/' + translate(roster.character).toLocaleLowerCase() + '_full.png'}
			alt=""
		/>
	{/if}
</div>

<style lang="scss">
	@import '../styles/colors';

	.roster {
		position: relative;
		padding-top: 70px;
		background-color: transparentize($dark, 0.6);
		-webkit-backdrop-filter: saturate(180%) blur(20px);
		backdrop-filter: saturate(180%) blur(20px);
		border: 2px solid transparentize($dark, 0.8);
		border-radius: 10px 10px 0 0;

		h1 {
			transform: rotateZ(-90deg);
			position: absolute;
			line-height: 0px;
			right: 40px;
			bottom: -40px;
			text-align: left;
			line-height: 0;
			font-size: 100px;
			text-transform: uppercase;
			width: 0px;
			color: transparentize(white, 0.5);
		}

		img {
			width: 280px;
			height: 480px;
			object-fit: cover;
			filter: grayscale(1) drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
			transition: all 0.5s;

			&.locked {
				filter: grayscale(0) drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
				transform: scale(1.2) translateY(-22px);
			}
		}
	}
</style>
