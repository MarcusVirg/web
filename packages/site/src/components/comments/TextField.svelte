<script lang="ts">
	export let name: string
	export let label: string
	export let value: string
</script>

<div class="flex flex-col space-y-2 w-full">
	{#if label}
		<label for={name}>{label}</label>
	{/if}
	<input
		id={name}
		type="text"
		class="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
		{name}
		bind:value
	/>
</div>
