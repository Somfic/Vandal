<script>
	import ChatMessage from '../components/ChatMessage.svelte';
	import { messages } from '../api/store';
	import { onMount } from 'svelte';
	import { connect } from '../api/websocket';

	onMount(async () => {
		connect('ws://localhost:3000/ws');
	});
</script>

<div class="messages">
	{#each $messages as message}
		<ChatMessage chat={message} />
	{/each}
</div>

<style lang="scss">
	.messages {
		position: absolute;
		z-index: 1;
		bottom: 50px;
		right: 25px;
		border-radius: 5px;
		overflow: hidden;
	}
</style>
