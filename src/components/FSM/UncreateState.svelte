<script lang="ts">
	import type { Position } from 'src/types';
	import State from '../State.svelte';

	export let toggleDraggingState: () => void;
	export let setInitialPosition: (position: Position) => void;
	export let setInitialCursorPosition: (position: Position) => void;

	const onMouseDown = (event: MouseEvent) => {
		const currentBoundingRect = document.getElementById('uncreated-state')?.getBoundingClientRect();

		if (!!currentBoundingRect) {
			const initialStatePosition = {
				top: currentBoundingRect.top - 24,
				left: currentBoundingRect.left - window.innerWidth * 0.1 + 5
			};
			setInitialPosition(initialStatePosition);
		}

		setInitialCursorPosition({ top: event.clientY, left: event.clientX });

		toggleDraggingState();
	};
</script>

<State {onMouseDown} />
