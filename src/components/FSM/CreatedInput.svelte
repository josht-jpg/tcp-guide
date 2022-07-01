<script lang="ts">
	import type { Input, Position } from '../../types';

	export let input: Input;
	export let cursorPosition: Position;
	export let isStateDragging: boolean;

	let isDragging = false;

	let draw = `M ${input.x1} ${input.y1} ${input.x2} ${input.y2}`;
	let curve: string;
	const bendInput = (cursorPosition: Position) => {
		curve = `Q ${
			cursorPosition.left -
			(document.getElementById('edit-area')?.getBoundingClientRect()?.left ?? 0)
		} ${
			cursorPosition.top - (document.getElementById('edit-area')?.getBoundingClientRect()?.top ?? 0)
		}`;
	};

	$: {
		if (isDragging) {
			bendInput(cursorPosition);
		}
	}

	$: {
		console.log(input);

		if (!!curve) {
			draw = `M ${input.x1} ${input.y1} ${curve} ${input.x2} ${input.y2}`;
		} else {
			draw = `M ${input.x1} ${input.y1} ${input.x2} ${input.y2}`;
		}
	}

	const id = `input-from-${input.startStateId}-to-${input.endStateId}`;
	const markerId = `${id}-marker`;

	const onMouseDown = () => {
		isDragging = true;
	};
	const onMouseUp = () => {
		isDragging = false;
	};
</script>

<svelte:window on:mouseup={onMouseUp} />

<marker
	id={markerId}
	refX="5.6"
	refY="3"
	markerUnits="strokeWidth"
	markerHeight="6"
	markerWidth="6"
	orient="auto"
>
	<path d="M 0 0 L 6 3 L 0 6 z" class="fill-slate-600 opacity-65" />
</marker>
<path
	on:mousedown={onMouseDown}
	d={draw}
	style={`marker-end: url(#${markerId});`}
	class={`absolute z-[50] stroke-[3px] stroke-slate-600 opacity-65 ${
		isDragging ? 'cursor-grabbing' : `cursor-grab ${!isStateDragging ? 'transition-all' : ''}`
	}`}
/>
