<template>
	<div
		v-if="!store.data || store.data.length === 0"
		class="uk-padding uk-text-center"
	>
		<div uk-spinner="ratio: 2"></div>
		<p>Daten werden geladen...</p>
	</div>

	<div v-else-if="!selectedPlay" class="uk-padding uk-text-center">
		<h2>Play nicht gefunden</h2>
		<p>
			Das gesuchte Play mit der ID "{{ route.params.id }}" wurde nicht gefunden.
		</p>
		<RouterLink :to="{ name: 'Home' }" class="uk-button uk-button-primary">
			Zurück zur Übersicht
		</RouterLink>
	</div>

	<div
		v-else
		class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle"
		uk-grid
	>
		<div
			class="uk-background-contain uk-position-relative"
			:style="{
				'background-image': 'url(./../plays/' + route.params.id + '.jpg)',
			}"
			uk-height-viewport
			uk-lightbox
		>
			<a class="uk-position-cover" :href="`./../plays/${route.params.id}.jpg`">
			</a>
		</div>
		<div class="uk-padding">
			<RouterLink
				:to="{ name: 'Home' }"
				class="uk-button uk-button-default uk-margin-bottom"
			>
				← Zurück
			</RouterLink>

			<h2>Play Details</h2>

			<table class="uk-table uk-table-divider uk-table-small">
				<tbody>
					<tr v-for="(value, key) in selectedPlay" :key="key">
						<th class="uk-text-nowrap">{{ key }}</th>
						<td>{{ value }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
//
// Imports
//
// ========================================================================

import { useRoute, useRouter } from "vue-router";
import { store } from "@/js/store";
import { computed, watch } from "vue";
import { RouterLink } from "vue-router";

//
// Constants
//
// ========================================================================
const route = useRoute();
const router = useRouter();

//
// Computed Properties
//
// ========================================================================

// Reaktive Berechnung des ausgewählten Plays
const selectedPlay = computed(() => {
	if (!store.data || store.data.length === 0) {
		return null;
	}
	return store.data.find((play) => play.playId == route.params.id);
});

//
// Watchers
//
// ========================================================================

// Watcher für selectedPlay, um den Store zu aktualisieren
watch(
	selectedPlay,
	(newPlay) => {
		if (newPlay) {
			store.setSelectedPlay(newPlay);
			console.log("Play gefunden:", newPlay);
		} else if (store.data.length > 0) {
			// Daten sind geladen, aber Play nicht gefunden
			console.warn("Play mit ID nicht gefunden:", route.params.id);
			// Optional: Zurück zur Home-Seite navigieren
			router.push({ name: "Home" });
		}
	},
	{ immediate: true }
);
</script>

<style lang="scss"></style>
