<script lang="ts">
	import { CONSTRUCTION_INPUT_CONTAINER_ID } from '../../constants';

	import type { Position } from 'src/types';

	import State from '../State.svelte';
	import StateDailog from './StateDailog.svelte';

	export let initialPosition: Position;
	export let isInEditArea: (position: Position) => boolean;
	export let isShiftDown: boolean;
	export let index: number;
	export let resetInputs: () => void;
	export let saveInputs: () => void;
	export let updateIsDraggingState: (isDragging: boolean) => void;

	let position = initialPosition;
	// TODO: remove (see cursorPositionProp)
	let cursorPosition: Position;
	let isDragging = false;

	const onMouseDown = (event: MouseEvent) => {
		cursorPosition = { top: event.clientY, left: event.clientX };
		if (!isShiftDown) {
			isDragging = true;
			updateIsDraggingState(true);
		}
	};

	const onMouseUp = () => {
		if (isDragging) {
			if (!isInEditArea(position)) {
				position = initialPosition;
				resetInputs();
			} else {
				initialPosition = position;
				saveInputs();
			}

			updateIsDraggingState(false);
			isDragging = false;
		}
	};

	// TODO: pass in, too many event listeners
	const onMouseMove = (event: MouseEvent) => {
		event.preventDefault();

		if (isShiftDown) {
			return;
		}

		if (isDragging) {
			position = {
				top: position.top + (event.clientY - cursorPosition.top),
				left: position.left + (event.clientX - cursorPosition.left)
			};

			cursorPosition = { top: event.clientY, left: event.clientX };
		}
	};
	let showDialog = false;
	const onRightClick = () => {
		showDialog = true;
	};

	// TODO: make enum
	let stateName = '';
	let updateStateName = (newName: string) => {
		stateName = newName;
	};
</script>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<State
	id={`state-node${index}`}
	{onRightClick}
	{onMouseDown}
	{position}
	{isDragging}
	styleProps={`${isShiftDown ? 'cursor: crosshair;' : ''}`}
/>

{#if showDialog}
	<StateDailog {stateName} {cursorPosition} {updateStateName} />
{/if}
