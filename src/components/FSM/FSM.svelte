<script lang="ts">
	import type { Input, Position } from '../../types';

	import { clickOutside } from '../../utils/clickOutside';
	import ConstructionInput from './ConstructionInput.svelte';
	import CreatedState from './CreatedState.svelte';
	import DifficultyButton from './difficultyButton.svelte';
	import DraggingState from './DraggingState.svelte';
	import CreatedInput from './CreatedInput.svelte';
	import UncreateState from './UncreateState.svelte';
	import stateUnderCursor from '../../utils/stateUnderCursor';
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

	let isStateDragging = false;
	const updateIsDraggingState = (isDragging: boolean) => {
		isStateDragging = isDragging;
	};

	let cursorPosition: Position;

	let inputs: Input[] = [];
	const addInput = (newInput: Input) => {
		inputs = [...inputs, newInput];
	};

	let prevInputs: Input[] = [];
	let resetInputs = () => {
		console.log('herererere');
		inputs = [...prevInputs];
	};
	let saveInputs = () => {
		console.log('saved');
		prevInputs = inputs;
	};

	// TODO: move all mouseup/down event listeners to this component
	let isMouseDown = false;
	const onMouseDown = () => {
		prevInputs = [...inputs];
		isMouseDown = true;
	};
	const onMouseUp = () => {
		isMouseDown = false;
	};

	const onMouseMove = (event: MouseEvent) => {
		if (!cursorPosition) {
			cursorPosition = { top: event.clientY, left: event.clientX };
			return;
		}

		const movingState = stateUnderCursor(cursorPosition);
		// Check if dragging state
		if (!!movingState && isMouseDown && !isShiftDown) {
			const changeInX = event.clientX - cursorPosition.left;
			const changeInY = event.clientY - cursorPosition.top;

			inputs.forEach((input, index) => {
				if (input.startStateId === movingState.id) {
					inputs[index] = {
						...input,
						x1: input.x1 + changeInX,
						y1: input.y1 + changeInY
					};
				} else if (input.endStateId === movingState.id) {
					inputs[index] = {
						...inputs[index],
						x2: input.x2 + changeInX,
						y2: input.y2 + changeInY
					};
				}
			});
		}

		cursorPosition = { top: event.clientY, left: event.clientX };
	};

	// const mouseUpCallback
</script>

<svelte:window
	on:keydown={onKeyDown}
	on:keyup={onKeyUp}
	on:mousemove={onMouseMove}
	on:mousedown={onMouseDown}
	on:mouseup={onMouseUp}
/>

<div
	id="fsm-module"
	use:clickOutside={() => {
		// toggleFsmTest();
	}}
	class="fixed flex flex-col items-center top-6 w-[80vw] left-[calc(10vw - 5px)] bg-white shadow-2xl border-2 border-blue-400 rounded border-box p-8 max-h-[90vh]"
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
					<CreatedState
						{index}
						{isShiftDown}
						initialPosition={state}
						{isInEditArea}
						{resetInputs}
						{saveInputs}
						{updateIsDraggingState}
					/>
				{/each}
				<ConstructionInput {addInput} {cursorPosition} {isShiftDown} />
				<svg class="z-[-1] w-[60vw] h-[60vh] bg-transparent" style="fill: none;">
					{#each inputs as input}
						<CreatedInput {input} {cursorPosition} {isStateDragging} />
					{/each}
				</svg>
			</div>
		</div>
	{:else}
		<div>here</div>
	{/if}
</div>
