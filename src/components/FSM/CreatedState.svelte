<script lang="ts">
	import { CONSTRUCTION_INPUT_CONTAINER_ID } from '../../constants';

	import type { Position } from 'src/types';

	import State from '../State.svelte';
	import { loop_guard } from 'svelte/internal';

	export let initialPosition: Position;
	export let isInEditArea: (position: Position) => boolean;
	export let isShiftDown: boolean;

	let position = initialPosition;
	export let cursorPositionProp: Position;
	// TODO: remove (see cursorPositionProp)
	let cursorPosition: Position;
	let isDragging = false;

	const onMouseDown = (event: MouseEvent) => {
		cursorPosition = { top: event.clientY, left: event.clientX };
		isDragging = true;
	};
	const onMouseUp = () => {
		if (!isInEditArea(position)) {
			position = initialPosition;
		} else {
			initialPosition = position;
		}

		isDragging = false;
	};

	let constructionInputStartPoint: Position;
	const createInput = (startPosition: Position) => {
		constructionInputStartPoint = startPosition;
	};

	// TODO: pass in, too many event listeners
	const onMouseMove = (event: MouseEvent) => {
		event.preventDefault();

		if (isShiftDown) {
			if (!constructionInputStartPoint) {
				createInput({ top: event.clientY, left: event.clientX });
			}
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
	{onMouseDown}
	{position}
	{isDragging}
	styleProps={`${isShiftDown ? 'cursor: crosshair;' : ''}`}
/>
<svg id={CONSTRUCTION_INPUT_CONTAINER_ID} class="z-[-1] absolute w-[78%] h-[95%] bg-transparent">
	<line
		x1={(() => {
			console.log(constructionInputStartPoint, cursorPositionProp);
			return constructionInputStartPoint?.left;
		})()}
		x2={cursorPositionProp?.left}
		y1={constructionInputStartPoint?.top}
		y2={cursorPositionProp?.top}
		class={`${!constructionInputStartPoint ? 'hidden' : ''} stroke-slate-600 opacity-75`}
	/>
</svg>
