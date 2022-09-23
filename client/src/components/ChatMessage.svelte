<script lang="ts">
	import { messages } from '../api/store';

	import { onMount } from 'svelte';

	import { get } from 'svelte/store';
	import type { ChatMessage } from '../api/chat';
	export let chat: ChatMessage;

	let initialHide = true;

	onMount(() => {
		setTimeout(() => {
			initialHide = false;
		}, 1);

		setTimeout(() => {
			chat.hidden = true;
			let newMessages = get(messages);
			let index = newMessages.findIndex((c) => c.id === chat.id);
			newMessages[index].is_new = false;
			messages.set(newMessages);
		}, 60000);
	});
</script>

<div class={'chat ' + (initialHide ? 'init ' : ' ') + (chat.hidden ? 'hide' : '')}>
	<span class="sender" style="{'color: ' + chat.tags.color};">{chat.tags['display-name']}</span
	><span class="divider" />
	<span class="message">{chat.message}</span>
</div>

<style lang="scss">
	.chat {
		display: flex;
		width: 440px;
		line-height: 29px;
		align-items: flex-start;
		background-color: rgba(0, 0, 0, 0.6);
		color: white;
		transition: all 300ms ease;
		padding: 1px 12px;
		font-size: 15px;

		&.init {
			line-height: 0px;
			opacity: 0;
			transform: translateY(40px);
		}

		&.hide {
			line-height: 0px;
			opacity: 0;
			transform: translateY(-40px);
			height: 0px;
			padding: 0;
		}

		.sender {
			font-weight: bold;
		}

		.divider {
			margin-right: 10px;
			opacity: 0.5;
		}
	}
</style>
