<script lang="ts">
	import { users } from '../api/userinfo';
	import type { Roster } from '../api/roster';
	import { agent as translate } from '../api/translator';
	import Voice from './Voice.svelte';

	export let roster: Roster | undefined;

	$: userInfo = users.filter((x) => x.valorantId == roster?.name)[0];
</script>

<div class="wrapper">
	{#if userInfo}
		<div class="voice" class:locked={roster?.locked}>
			<Voice discordId={userInfo.discordId} size="medium" />
		</div>
	{/if}

	<div class={'roster'} style={'border-color: ' + userInfo?.color + ';color: ' + userInfo?.color}>
		{#if roster != undefined}
			<h1>{translate(roster.character)}</h1>
			<img
				class:locked={roster?.locked}
				src={'/images/agents/' + translate(roster.character).toLocaleLowerCase() + '_full.png'}
				alt=""
			/>
		{/if}
	</div>
</div>

<style lang="scss">
	@import '../styles/colors';

	.wrapper {
		position: relative;
		display: flex;
		justify-content: center;
	}

	.roster {
		margin-top: 200px;
		position: relative;
		padding-top: 70px;
		background-color: transparentize($dark, 0.1);
		border: 5px solid transparentize($dark, 0.8);
		border-radius: 10px 10px 0 0;
		border-bottom: none;
		//-webkit-backdrop-filter: saturate(180%) blur(20px);
		//backdrop-filter: saturate(180%) blur(20px);

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
			transition: all 0.5s ease;

			&.locked {
				filter: grayscale(0) drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
				transform: scale(1.2) translateY(-22px);
			}
		}
	}

	.voice {
		margin-bottom: -110px;
		transition: all 0.5s ease;
		position: absolute;
		top: 80px;

		&.locked {
			top: 0px;
			transition-delay: 200ms;
		}
	}
</style>
