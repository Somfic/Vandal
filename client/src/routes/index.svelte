<script lang="ts">
	import { onMount } from 'svelte';

	import { connect } from '../api/websocket';
	onMount(async () => {
		connect('ws://localhost:3000/ws');
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
