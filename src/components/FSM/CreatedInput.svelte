<script lang="ts">
	import type { Input } from '../../types';

	export let input: Input;

	const id = `input-from-${input.startStateId}-to-${input.endStateId}`;
	const markerId = `${id}-marker`;
</script>

<svg {id} class="z-[-1] absolute w-[60vw] h-[60vh] bg-transparent">
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
	<line
		x1={input.x1}
		x2={input.x2}
		y1={input.y1}
		y2={input.y2}
		style={`marker-end: url(#${markerId});`}
		class="stroke-[3px] stroke-slate-600 opacity-65"
	/>
</svg>
