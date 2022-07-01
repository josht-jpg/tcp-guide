<script lang="ts">
	import type { Position } from 'src/types';

	export let stateName: string;
	export let updateStateName: (newName: string) => void;
	export let cursorPosition: Position;

	let showOptions = false;

	const states = [
		'Closed',
		'Listen',
		'SYN Received',
		'SYN Sent',
		'Established',
		'FIN Wait 1',
		'FIN Wait 2',
		'Closing',
		'Time Wait',
		'Close Wait',
		'Last ACK'
	];
</script>

<div
	class={'absolute rounded p-5 bg-white'}
	style={`box-shadow: grey 0 0 7px; width: 290px; top: ${cursorPosition.top - 125}px; left: ${
		cursorPosition.left - 290
	}px;`}
>
	<label for="state-name"> State Name</label>
	<input
		id="state-name"
		on:focus={() => {
			showOptions = true;
		}}
		on:focusout={() => {
			showOptions = false;
		}}
		value={stateName}
		class="outline outline-2 outline-blue-300 focus:outline-blue-500 rounded w-[80%]"
	/>

	{#if showOptions}
		<div
			class="absolute w-[80%] mt-2 flex flex-col items-center bg-white outline outline-slate-400 outline-1 rounded"
			style="left: 10%;"
		>
			{#each states as state}
				<p class="w-full hover:bg-blue-200 cursor-pointer" on:click={() => updateStateName(state)}>
					{state}
				</p>
			{/each}
		</div>
	{/if}
</div>
