<script lang="ts">
	import { oldScore, score } from '../api/store';
</script>

<div class="result">
	<p>Score: {JSON.stringify($score)}</p>
	<p>Old Score: {JSON.stringify($oldScore)}</p>

	{#if $score.won > $oldScore.won}
		<h1>Won</h1>
	{:else if $score.lost > $oldScore.lost}
		<h1>Lost</h1>
	{:else}
		<h1>Tie</h1>
	{/if}
</div>
