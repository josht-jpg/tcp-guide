<script lang="ts">
	import stateUnderCursor from '../../utils/stateUnderCursor';

	import { CONSTRUCTION_INPUT_CONTAINER_ID } from '../../constants';
	import type { Position, Input } from '../../types';

	export let cursorPosition: Position;
	export let isShiftDown: boolean;
	export let addInput: (newInput: Input) => void;

	let constructionInputStartPoint: Position | null;
	const initializeInput = (startPosition: Position) => {
		constructionInputStartPoint = startPosition;
	};

	let isMouseDown = false;
	let startStateId: string;
	const onMouseDown = () => {
		isMouseDown = true;
		const startInput = stateUnderCursor(cursorPosition);
		if (!!startInput) {
			startStateId = startInput.id;
		}
	};

	let inputCoordinates: { x1: number; x2: number; y1: number; y2: number };
	$: {
		const containerBoundingRect = document
			.getElementById(CONSTRUCTION_INPUT_CONTAINER_ID)
			?.getBoundingClientRect();
		const containerLeft = containerBoundingRect?.left ?? 0;
		const containerTop = containerBoundingRect?.top ?? 0;

		if (!!constructionInputStartPoint && !!cursorPosition && !stateUnderCursor(cursorPosition)) {
			inputCoordinates = {
				x1: constructionInputStartPoint.left - containerLeft,
				x2: cursorPosition.left - containerLeft,
				y1: constructionInputStartPoint.top - containerTop,
				y2: cursorPosition.top - containerTop
			};
		}
	}

	const onMouseUp = () => {
		isMouseDown = false;

		// TODO: change name
		const receivingState = stateUnderCursor(cursorPosition);
		if (!!receivingState) {
			addInput({ startStateId, endStateId: receivingState.id, ...inputCoordinates });
		}
	};

	$: {
		const isCursorOverState = !!stateUnderCursor(cursorPosition);

		if (isCursorOverState && isShiftDown && !constructionInputStartPoint) {
			initializeInput(cursorPosition);
		}
	}

	$: {
		if (!isShiftDown) {
			constructionInputStartPoint = null;
		}
	}
</script>

<svelte:window on:mousedown={onMouseDown} on:mouseup={onMouseUp} />

{#if !!inputCoordinates}
	<svg
		id={CONSTRUCTION_INPUT_CONTAINER_ID}
		class="z-[-1] absolute w-[60vw] h-[60vh] bg-transparent"
	>
		<marker
			id="tempMarker"
			refX="5.6"
			refY="3"
			markerUnits="strokeWidth"
			markerHeight="6"
			markerWidth="6"
			orient="auto"
		>
			<path d="M 0 0 L 6 3 L 0 6 z" class="fill-slate-600 opacity-55" />
		</marker>
		<line
			x1={inputCoordinates.x1}
			x2={inputCoordinates.x2}
			y1={inputCoordinates.y1}
			y2={inputCoordinates.y2}
			style={'marker-end: url(#tempMarker);'}
			class={`${
				!isMouseDown || !isShiftDown || !constructionInputStartPoint ? 'hidden' : ''
			} stroke-[3] stroke-slate-600 opacity-55`}
		/>
	</svg>
{/if}
