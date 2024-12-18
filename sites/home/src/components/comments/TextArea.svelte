<script lang="ts">
	type Props = {
		name: string
		label: string
		value: string
		error?: string
	}
	let { name, label, value = $bindable(), error = '' }: Props = $props()

	let textArea: HTMLTextAreaElement | null = $state(null)

	$effect(() => {
		if (textArea?.parentElement) {
			textArea.parentElement.dataset.replicatedValue = value
		}
	})
</script>

<div class="flex flex-col space-y-2 w-full">
	{#if label}
		<label for={name}>{label}</label>
	{/if}
	<div class="ta-container">
		<textarea
			bind:this={textArea}
			id={name}
			class="resize-none overflow-hidden appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-brand-blue focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-brand-blue dark:focus:ring-brand-blue/10"
			{name}
			bind:value
		></textarea>
	</div>
	{#if error}
		<p class="text-red-600 dark:text-red-400 font-sm">{error}</p>
	{/if}
</div>

<style>
	/* https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/ */
	.ta-container {
		display: grid;
	}

	textarea,
	.ta-container::after {
		/* Place on top of each other */
		grid-area: 1 / 1 / 2 / 2;
	}

	.ta-container::after {
		/* Note the weird space! Needed to prevent jumpy behavior */
		content: attr(data-replicated-value) ' ';

		/* This is how textarea text behaves */
		white-space: pre-wrap;

		/* Hidden from view, clicks, and screen readers */
		visibility: hidden;

		font: inherit;
		border-width: 1px;
		padding: 0.5rem 0.75rem;
	}
</style>
