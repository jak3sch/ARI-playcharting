<template>
	<button
		class="uk-button uk-button-default uk-button-small"
		:class="{
			'uk-active': filterTitle !== props.title,
		}"
		type="button"
	>
		{{ filterTitle }}
		<span
			class="uk-badge"
			@click="setTitle('Reset')"
			:uk-filter-control="`filter: ; group: ${filter}`"
			:class="{ 'uk-hidden': filterTitle === props.title }"
			><i data-uk-icon="icon: close; ratio: 0.5"></i
		></span>
	</button>
	<div class="uk-card uk-card-body uk-card-default" uk-drop>
		<button
			class="uk-button uk-button-default uk-button-small"
			type="button"
			v-for="entry in findValuesByKey(filter)"
			:uk-filter-control="`filter: [data-${filter}='${entry}']; group: ${filter}`"
			@click="setTitle(entry)"
		>
			{{ entry }}
		</button>
	</div>
</template>

<script setup>
import { store } from "@/js/store";

//
// Imports
//
// ========================================================================

import { ref } from "vue";

//
// Constants
//
// ========================================================================

const props = defineProps({
	title: {
		type: String,
		default: "Filter",
		required: true,
	},
	filter: {
		type: String,
		default: "filter",
		required: true,
	},
});

const filterTitle = ref(props.title);

//
// Functions
//
// ========================================================================

const findValuesByKey = (key) => {
	// gett all unique values for a given key in data
	if (!store.data) return [];
	const values = store.data
		.map((item) => item[key])
		.filter((v) => v !== undefined && v !== null);

	return [...new Set(values)]; // return unique values
};

const setTitle = (entry) => {
	if (entry === "Reset") {
		filterTitle.value = props.title;
		return;
	}

	filterTitle.value = props.title + ": " + entry;
};
</script>

<style lang="scss" scoped>
// .uk-active {
// 	background: #39f;
// }

.uk-badge {
	position: absolute;
	top: -5px;
	right: -10px;
}
</style>
