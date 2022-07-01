<script lang="ts">
	import { HeaderSection } from '../../types';
	import { clickOutside } from '../../utils/clickOutside';

	export let headerSection: HeaderSection;
	export let close: () => void;
</script>

<div
	class="absolute flex items-center justify-center w-full h-full bg-slate-700 opacity-50 animate-fade-in"
>
	<div
		use:clickOutside
		on:click_outside={close}
		class="w-[615px] border-2 border-blue-400 absolute rounded bg-white"
	>
		<h1>{headerSection}</h1>
		<p>
			{#if headerSection === HeaderSection.SRC_PORT}
				Concorde, this organ The new one I'm forming It's grown so persistent on you By the morning
				I'd fell to my feet And the doctor said we are unfortunately Running out of options to treat
				What a funny way to speak And you, like Concorde I came, a gentle hill racer I was
				breathless Up on every mountain Just to look for your light
			{/if}
		</p>
	</div>
</div>
