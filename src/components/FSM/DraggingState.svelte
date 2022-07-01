<script lang="ts">
	import type { Position } from 'src/types';
	import State from '../State.svelte';

	export let isInEditArea: (position: Position) => boolean;
	export let toggleDraggingState: () => void;
	export let initalPosition: Position;
	export let initialCursorPosition: Position;
	export let createState: (position: Position) => void;

	let statePosition = initalPosition;

	let prevX = initialCursorPosition.left;
	let prevY = initialCursorPosition.top;

	const onMouseUp = () => {
		toggleDraggingState();
		if (isInEditArea(statePosition)) {
			createState(statePosition);
		}
	};

	const onMouseMove = (e: MouseEvent) => {
		e.preventDefault();

		statePosition = {
			top: statePosition.top + (e.clientY - prevY),
			left: statePosition.left + (e.clientX - prevX)
		};

		prevX = e.clientX;
		prevY = e.clientY;
	};
</script>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<State position={statePosition} isDragging={true} />
