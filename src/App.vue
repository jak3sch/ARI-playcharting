<template>
	<RouterView />
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { store } from "./js/store";
import { RouterView } from "vue-router";

const data = ref(null);
const keys = ref(null);

onMounted(() => {
	if (store.data.length == 0) {
		const dataUrl =
			"https://script.google.com/macros/s/AKfycbyG3lnycxjEEC28v7fxY9WVQ_gVxf0Jug1QGeyzgp3xa12kOwiWyoaKwx0HnlTLJUqj/exec";

		axios
			.get(dataUrl)
			.then((response) => {
				// get first element of response.data and use its values as keys for all other elements
				let keys = response.data[0];

				// every key as camelcase
				keys = keys.map((key) => {
					return key
						.toLowerCase()
						.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
				});

				keys.value = keys;

				const cleanData = response.data
					// remove first element
					.slice(1)

					.map((item) => {
						// length of item
						const itemLength = Object.keys(item).length;
						const newItem = {};

						// for 0 to itemLength
						for (let i = 0; i < itemLength; i++) {
							const key = keys[i];
							newItem[key] = item[i] || null; // assign null if key is missing
						}

						return newItem;
					})
					.filter(
						(item) =>
							item.week != undefined && item.week != null && item.week !== ""
					)
					.sort((a, b) => {
						// First, sort by quarter ascending
						if (a.quarter !== b.quarter) {
							return a.quarter - b.quarter;
						}
						// Then, sort by time descending
						return b.time - a.time;
					});
				store.setData(cleanData);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}
});
</script>

<style scoped></style>
