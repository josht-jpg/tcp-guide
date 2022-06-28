<script lang="ts">
	import type { Position } from 'src/types';

	export let onMouseDown: ((event: MouseEvent) => void) | undefined = undefined;
	export let position: Position | undefined = undefined;
	export let isDragging = false;
	export let styleProps = '';
</script>

<div
	id="uncreated-state"
	class={`${!!position ? `absolute ` : ''} rounded box-border h-[58px] w-[112px] ${
		isDragging ? 'cursor-grabbing' : 'cursor-grab transition-all'
	} bg-white hover:shadow-blue-500`}
	style={`box-shadow: grey 0 0 6px; ${
		!!position ? `top: ${position.top}px; left: ${position.left}px; ${styleProps}` : ''
	}`}
	on:mousedown={onMouseDown}
/>
