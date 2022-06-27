<script lang="ts">
	import { clickOutside } from '../../utils/clickOutside';
	import State from '../State.svelte';
	import DifficultyButton from './difficultyButton.svelte';
	export let toggleFsmTest: () => void;
	// TODO: remove
	let _ = toggleFsmTest;

	enum DifficultyLevel {
		EASY = 'EASY',
		MEDIUM = 'MEDUIM',
		HARD = 'HARD'
	}
	let difficultyLevel: DifficultyLevel;

	const isInEditArea = (event: MouseEvent) =>
		document
			.elementsFromPoint(event.clientX, event.clientY)
			.some((element) => element.id === 'edit-area');

	let isDraggingNewState = false;
	let toggleDraggingState = () => {
		isDraggingNewState = !isDraggingNewState;
	};

	let showPlaceHolderState = false;
	const togglePlaceHolderState = () => {
		showPlaceHolderState = !showPlaceHolderState;
	};
</script>

<div
	use:clickOutside={() => {
		// toggleFsmTest();
	}}
	class="fixed flex flex-col items-center top-6 w-[80vw] left-[calc(10vw - 5px)] bg-white shadow-2xl rounded border-box p-8 max-h-[90vh]"
>
	{#if !difficultyLevel}
		<h1 class="text-xl">Choose Test</h1>
		<div class="flex flex-col items-center ">
			<div class="pt-4" />
			<DifficultyButton
				text="Fill in inputs (easy)"
				onClick={() => {
					difficultyLevel = DifficultyLevel.EASY;
				}}
			/>
			<div class="pt-4" />
			<DifficultyButton
				text="Fill in states and inputs (medium)"
				onClick={() => {
					difficultyLevel = DifficultyLevel.MEDIUM;
				}}
			/>
			<div class="pt-4" />
			<DifficultyButton
				text="Build entire state machine (hard)"
				onClick={() => {
					difficultyLevel = DifficultyLevel.HARD;
				}}
			/>
		</div>
	{:else if difficultyLevel === DifficultyLevel.HARD}
		<div class="w-[300px] flex flex-col items-center box-border p-3 pb-5 rounded">
			<h2>Add a State</h2>
			<State isDragging={false} {toggleDraggingState} {isInEditArea} />
			{#if isDraggingNewState}
				<State isDragging={true} {toggleDraggingState} {isInEditArea} />
			{/if}
			<div class="pt-6" />
			<div id="edit-area" class="w-[60vw] h-[60vh] outline outline-2 outline-blue-200 rounded" />
		</div>
	{:else}
		<div>here</div>
	{/if}
</div>
