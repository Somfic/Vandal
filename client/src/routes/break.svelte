<script>
	import { speakers } from '../api/store';
	import { connect } from '../api/websocket';
	import { onMount } from 'svelte';

	onMount(async () => {
		connect('ws://localhost:3000/ws');
	});
</script>

{#each $speakers as speaker}
	<h1>{speaker.name}</h1>
	<img src="" alt="" />
{/each}

<style lang="scss">
</style>
