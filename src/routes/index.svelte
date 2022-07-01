<script>
	import TcpHeader from '../components/TcpHeader.svelte';

	import FSM from '../components/FSM/FSM.svelte';

	let isFsmTestShowing = false;

	const toggleFsmTest = () => {
		isFsmTestShowing = !isFsmTestShowing;
	};
</script>

<div class="flex flex-col text-center items-center">
	<div class="pt-8" />
	<h1 class="text-2xl">An Interactive Guide to TCP!</h1>

	<div class="pt-4" />
	<TcpHeader />
	<div class="pt-4" />
	<button
		id="fsm-toggle"
		class="w-fit inline-flex items-center justify-center rounded border border-transparent bg-blue-500 px-3 py-1.5 text-xs font-medium text-white ring-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
		on:click={toggleFsmTest}>Test your understanding</button
	>
	{#if isFsmTestShowing}
		<FSM {toggleFsmTest} />
	{/if}
</div>
