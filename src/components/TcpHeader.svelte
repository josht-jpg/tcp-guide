<script lang="ts">
	import HeaderSectionInfo from './Header/HeaderSectionInfo.svelte';
	import { HeaderSection } from '../types';

	let selectedSection: HeaderSection | null = null;
	const updateSelectedSection = (newSelectedSection: HeaderSection | null) => {
		selectedSection = newSelectedSection;
	};
	const closeHeaderInfo = () => {
		selectedSection = null;
	};

	const sectionStyle =
		'inline-flex justify-center items-center box-border p-1 border-b-2 border-blue-400 cursor-pointer hover:bg-blue-200 transition-colors';
	const leftSectionStyle = `w-1/2 border-r-[1px] ${sectionStyle}`;
	const rightSectionStyle = `w-1/2 border-l-[1px] ${sectionStyle}`;
	const fullSectionStyle = `w-full ${sectionStyle}`;
</script>

<div class="flex flex-wrap shadow-xl border-2 border-blue-400 w-[615px] rounded">
	<span class={leftSectionStyle} on:click={() => updateSelectedSection(HeaderSection.SRC_PORT)}
		>{HeaderSection.SRC_PORT}</span
	>
	<span class={rightSectionStyle} on:click={() => updateSelectedSection(HeaderSection.DEST_PORT)}
		>{HeaderSection.DEST_PORT}</span
	>
	<span class={fullSectionStyle}>{HeaderSection.SEQ_NUM}</span>
	<span class={fullSectionStyle}>{HeaderSection.ACN_NUM}</span>
	<span class={leftSectionStyle} on:click={() => updateSelectedSection(HeaderSection.HEADER_LEN)}
		>{HeaderSection.HEADER_LEN}</span
	>
	<span class={rightSectionStyle} on:click={() => updateSelectedSection(HeaderSection.WINDOW_SIZE)}
		>{HeaderSection.WINDOW_SIZE}</span
	>
	<span class={leftSectionStyle} on:click={() => updateSelectedSection(HeaderSection.CHECKSUM)}
		>{HeaderSection.CHECKSUM}</span
	>
	<span
		class={rightSectionStyle}
		on:click={() => updateSelectedSection(HeaderSection.URGENT_POINTER)}
		>{HeaderSection.URGENT_POINTER}</span
	>
	<span class={fullSectionStyle} on:click={() => updateSelectedSection(HeaderSection.OPTIONS)}>
		{`${HeaderSection.OPTIONS} (0 or more 32-bit words)`}</span
	>
	<span
		class={`${fullSectionStyle} border-b-0`}
		on:click={() => updateSelectedSection(HeaderSection.DATA)}
		>{`${HeaderSection.DATA} (optional)`}</span
	>
</div>

{#if !!selectedSection}
	<HeaderSectionInfo headerSection={selectedSection} close={closeHeaderInfo} />
{/if}
