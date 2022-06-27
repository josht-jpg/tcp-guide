<script lang="ts">
	export let isInEditArea: (event: MouseEvent) => boolean;
	export let toggleDraggingState: () => void;

	export let isDragging: boolean;
	let prevX = 0;
	let prevY = 0;

	type Position = { left: number; top: number };
	let statePosition: Position;
	let initialStatePosition: Position;

	const onMouseDown = (e: MouseEvent) => {
		prevX = e.clientX;
		prevY = e.clientY;

		if (!statePosition) {
			const currentBoundingRect = document
				.getElementById('uncreated-state')
				?.getBoundingClientRect();

			if (!!currentBoundingRect) {
				initialStatePosition = {
					top: currentBoundingRect.top - 24,
					left: currentBoundingRect.left - window.innerWidth * 0.1 + 5
				};
				statePosition = initialStatePosition;
			}
		}

		toggleDraggingState();
		isDragging = true;
	};

	const onMouseUp = (event: MouseEvent) => {
		toggleDraggingState();
		isDragging = false;

		if (!isInEditArea(event)) {
			statePosition = initialStatePosition;
		}
	};

	const onMouseMove = (e: MouseEvent) => {
		if (!isDragging) {
			return;
		}
		e.preventDefault();

		statePosition = {
			top: statePosition.top + (e.clientY - prevY),
			left: statePosition.left + (e.clientX - prevX)
		};

		prevX = e.clientX;
		prevY = e.clientY;
	};
</script>

<svelte:window on:mousemove={onMouseMove} on:mouseup={onMouseUp} />

<div
	id="uncreated-state"
	class={`${!!statePosition ? `absolute ` : ''} rounded box-border h-[58px] w-[112px] ${
		isDragging ? 'cursor-grabbing' : 'cursor-grab transition-all'
	} bg-white hover:shadow-blue-500`}
	style={`box-shadow: grey 0 0 6px; ${
		!!statePosition ? `top: ${statePosition.top}px; left: ${statePosition.left}px;` : ''
	}`}
	on:mousedown={onMouseDown}
/>
