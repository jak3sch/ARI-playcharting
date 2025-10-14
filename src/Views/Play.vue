<template>
	<div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" uk-grid>
		<div
			class="uk-background-contain uk-position-relative"
			:style="{
				'background-image': 'url(./plays/' + route.params.id + '.jpg)',
			}"
			uk-height-viewport
			uk-lightbox
		>
			<a class="uk-position-cover" :href="`./plays/${route.params.id}.jpg`">
			</a>
		</div>
		<div class="uk-padding">
			<RouterLink :to="{ name: 'Home' }">zurück</RouterLink>
			<table class="uk-table uk-table-divider uk-table-small">
				<tbody>
					<tr v-for="(value, key) in store.selectedPlay" :key="key">
						<th>{{ key }}</th>
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
import { onBeforeMount } from "vue";
import { RouterLink } from "vue-router";

//
// Constants
//
// ========================================================================
const route = useRoute();
const router = useRouter();

//
// Functions
//
// ========================================================================

onBeforeMount(() => {
	if (store.data.length == 0) {
		router.push({ name: "Home" });
	}
});
</script>

<style lang="scss"></style>
