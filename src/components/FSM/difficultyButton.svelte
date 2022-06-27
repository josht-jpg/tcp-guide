<script lang="ts">
	export let onClick: () => void;
	export let text: string;
</script>

<button
	class="w-fit inline-flex items-center justify-center rounded border border-transparent bg-blue-500 px-3 py-1.5 text-xs font-medium text-white ring-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
	on:click={onClick}>{text}</button
>
