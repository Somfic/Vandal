<script lang="ts">
	import { page } from '$app/stores';
	import { map as translate } from '../api/translator';
	const map = translate($page.url.searchParams.get('')).toLocaleLowerCase();

	import { onMount } from 'svelte';
	import { connect } from '../api/websocket';
	import Voice from '../components/Voice.svelte';

	let hideText = true;
	let hideImage = true;
	let hideVideo = true;

	onMount(async () => {
		connect('ws://localhost:3000/ws');

		hideVideo = false;
		setTimeout(() => {
			startAnimation();
		}, 10);
	});

	function startAnimation() {
		hideText = false;
		setTimeout(() => {
			hideImage = false;
		}, 500);
	}
</script>

<div class="wrapper">
	<div class="voice">
		<Voice />
	</div>
	<video class={hideVideo ? 'hide' : ''} src="/videos/bp.webm" autoplay muted loop />
	<h1 class={hideText ? 'hide' : ''}>{map}</h1>
	<img
		class={map + ' ' + (hideImage ? 'hide' : '')}
		src="/images/maps/{map.toLocaleLowerCase()}_transparent.png"
		alt=""
	/>
</div>

<style lang="scss">
	@import '../styles/colors';

	.wrapper {
		flex-grow: 1;
		background-color: $dark;
		width: 100vw;
		height: 100vh;

		.voice {
			position: absolute;
			z-index: 1;
			width: 100vw;
			top: 30px;
		}

		video {
			position: absolute;
			margin-top: -60px;
			filter: blur(1px) brightness(1.5);
			width: 100vw;
			height: 100vh;
			object-fit: cover;
			transition: all 4s ease;

			&.hide {
				transform: translateY(0px);
				opacity: 0;
			}
		}

		.hide {
			transform: translateY(400px);
			opacity: 0;
		}

		h1 {
			transition: all 1s ease;
			position: fixed;
			font-size: 385px;
			line-height: 0;
			margin: 0;
			margin-top: 23rem;
			width: 100vw;
			text-align: center;
			text-transform: uppercase;
			color: rgb(255, 255, 255);
			filter: drop-shadow(10px 20px 0px rgba(116, 116, 116, 0.25));
			transition: all 1s ease;
		}

		img {
			transition: all 1s ease;
			object-fit: contain;
			width: 100%;
			max-width: 100vw;
			position: fixed;
			filter: saturate(1.2) blur(0px) drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.532));

			&.fracture {
				margin-top: 230px;
			}

			&.split {
				margin-top: 390px;
			}

			&.pearl {
				margin-top: 220px;
			}

			&.icebox {
				margin-top: 140px;
			}

			&.haven {
				margin-top: 440px;
			}

			&.breeze {
				margin-top: 210px;
			}

			&.bind {
				margin-top: 460px;
			}

			&.ascent {
				margin-top: 290px;
			}
		}
	}
</style>
