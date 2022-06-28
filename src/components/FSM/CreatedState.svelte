<script lang="ts">
	import { CONSTRUCTION_INPUT_CONTAINER_ID } from '../../constants';

	import type { Position } from 'src/types';

	import State from '../State.svelte';

	export let initialPosition: Position;
	export let isInEditArea: (position: Position) => boolean;
	export let isShiftDown: boolean;
	export let index: number;

	let position = initialPosition;
	// TODO: remove (see cursorPositionProp)
	let cursorPosition: Position;
	let isDragging = false;

	const onMouseDown = (event: MouseEvent) => {
		cursorPosition = { top: event.clientY, left: event.clientX };
		if (!isShiftDown) {
			isDragging = true;
		}
	};

	const onMouseUp = () => {
		if (!isInEditArea(position)) {
			position = initialPosition;
		} else {
			initialPosition = position;
		}

		isDragging = false;
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
</script>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<State
	id={`state-node${index}`}
	{onMouseDown}
	{position}
	{isDragging}
	styleProps={`${isShiftDown ? 'cursor: crosshair;' : ''}`}
/>
