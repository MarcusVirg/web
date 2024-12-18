<script lang="ts">
	type Props = {
		name: string
		label: string
		value: string
		error?: string
	}
	let { name, label, value = $bindable(), error = '' }: Props = $props()
</script>

<div class="flex flex-col space-y-2 w-full">
	{#if label}
		<label for={name}>{label}</label>
	{/if}
	<input
		id={name}
		type="text"
		class="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-2 shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-brand-blue focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-brand-blue dark:focus:ring-brand-blue/10"
		{name}
		bind:value
	/>
	{#if error}
		<p class="text-red-600 dark:text-red-400 font-sm">{error}</p>
	{/if}
</div>
