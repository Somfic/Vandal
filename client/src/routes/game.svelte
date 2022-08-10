<script lang="ts">
	import { onMount } from 'svelte';
	import { connect } from '../api/websocket';
	import Voice from '../components/Voice.svelte';

	onMount(async () => {
		connect('ws://localhost:3000/ws');
	});
</script>

<div class="voice">
	<Voice size="small" />
</div>

<style>
	.voice {
		position: absolute;
		z-index: 2;
		right: 40px;
		top: 10px;
	}
</style>
