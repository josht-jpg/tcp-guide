<script lang="ts">
	import type { Input, Position } from '../../types';

	import { clickOutside } from '../../utils/clickOutside';
	import ConstructionInput from './ConstructionInput.svelte';
	import CreatedState from './CreatedState.svelte';
	import DifficultyButton from './difficultyButton.svelte';
	import DraggingState from './DraggingState.svelte';
	import CreatedInput from './CreatedInput.svelte';
	import UncreateState from './UncreateState.svelte';
	export let toggleFsmTest: () => void;
	// TODO: remove
	let _ = toggleFsmTest;

	enum DifficultyLevel {
		EASY = 'EASY',
		MEDIUM = 'MEDUIM',
		HARD = 'HARD'
	}

	let difficultyLevel: DifficultyLevel;

	/*
	
	*/

	const isInEditArea = (position: Position) =>
		document
			.elementsFromPoint(position.left + (window.innerWidth * 0.1 + 5), position.top + 24)
			.some((element) => element.id === 'edit-area');

	let isDraggingNewState = false;
	let toggleDraggingState = () => {
		isDraggingNewState = !isDraggingNewState;
	};

	let showPlaceHolderState = false;
	const togglePlaceHolderState = () => {
		showPlaceHolderState = !showPlaceHolderState;
	};

	let uncreatedStatePosition: Position;
	const setInitialStatePosition = (p: Position) => {
		uncreatedStatePosition = p;
	};

	let initialCursorPosition: Position;
	const setInitialCursorPosition = (position: Position) => {
		initialCursorPosition = position;
	};

	let createdStates: Position[] = [];
	const createState = (position: Position) => {
		createdStates = [...createdStates, position];
	};

	let isShiftDown = false;
	const onKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Shift') {
			isShiftDown = true;
		}
	};

	const onKeyUp = (event: KeyboardEvent) => {
		if (event.key === 'Shift') {
			isShiftDown = false;
		}
	};

	let cursorPosition: Position;
	const onMouseMove = (event: MouseEvent) => {
		cursorPosition = { top: event.clientY, left: event.clientX };
	};

	let inputs: Input[] = [];
	const addInput = (newInput: Input) => {
		inputs = [...inputs, newInput];
	};

	// const mouseUpCallback
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} on:mousemove={onMouseMove} />

<div
	id="fsm-module"
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
			<UncreateState
				setInitialPosition={setInitialStatePosition}
				{setInitialCursorPosition}
				{toggleDraggingState}
			/>
			{#if isDraggingNewState}
				<DraggingState
					initalPosition={uncreatedStatePosition}
					{createState}
					{initialCursorPosition}
					{toggleDraggingState}
					{isInEditArea}
				/>
			{/if}
			<div class="pt-6" />
			<div id="edit-area" class="w-[60vw] h-[60vh] outline outline-2 outline-blue-200 rounded">
				{#each createdStates as state, index}
					<CreatedState {index} {isShiftDown} initialPosition={state} {isInEditArea} />
				{/each}
				<ConstructionInput {addInput} {cursorPosition} {isShiftDown} />
				{#each inputs as input}
					<CreatedInput {input} />
				{/each}
			</div>
		</div>
	{:else}
		<div>here</div>
	{/if}
</div>
