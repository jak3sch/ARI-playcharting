<template>
	<div uk-filter="target: .js-filter">
		<div class="uk-background-default" data-uk-sticky>
			<div class="uk-container uk-padding">
				<ul class="uk-subnav uk-subnav-pill">
					Filter
					<li uk-filter-control>Reset</li>
					<li uk-filter-control="[data-motion]"></li>
					<!-- <li>
						<button class="uk-button uk-button-default" type="button">
							Week
						</button>
						<div class="uk-card uk-card-body uk-card-default" uk-drop>
							<div class="uk-button-group">
								<button
									class="uk-button uk-button-default"
									type="button"
									uk-filter-control
								>
									Reset
								</button>
								<button
									class="uk-button uk-button-default"
									type="button"
									v-for="index in 18"
									:uk-filter-control="`[data-week='${index}']; group: week`"
								>
									{{ index }}
								</button>
							</div>
						</div>
					</li> -->
					<li>
						<Filter title="QB Grade" filter="qbGrade" />
					</li>
					<li>
						<Filter title="Problem" filter="problem" />
					</li>
					<li>
						<Filter title="Playmaker" filter="playmaker" />
					</li>
					<li>
						<Filter title="Who Fucked Up" filter="whoFuckedUp" />
					</li>
					<li>
						<Filter title="Down" filter="down" />
					</li>
					<li>
						<Filter title="Game Script" filter="gameScript" />
					</li>
					<li>
						<Filter title="Play" filter="play" />
					</li>
				</ul>
			</div>
		</div>

		<ul
			class="js-filter uk-grid-small uk-child-width-1-2 uk-child-width-1-3@m uk-child-width-1-5@l uk-padding"
			uk-grid="masonry: false"
			uk-lightbox="animation: slide"
		>
			<li
				class="tag-white"
				v-for="play in store.data"
				:key="play.playId"
				:data-problem="play.problem"
				:data-grade="play.qbGrade"
				:data-week="play.week"
				:data-motion="play.motion"
				:data-playAction="play.playAction"
				:data-rpo="play.rpo"
				:data-personnel="play.personnel"
				:data-down="play.down"
				:data-qrtr="play.quarter"
				:data-play="play.play"
				:data-gameScript="play.gameScript"
				:data-playmaker="play.playmaker"
				:data-whoFuckedUp="play.whoFuckedUp"
			>
				<div class="uk-card uk-card-default">
					<a :href="`public/plays/${play.playId}.jpg`">
						<img :src="`./plays/${play.playId}.jpg`" alt="" />
					</a>

					<!-- <pre>{{ play }}</pre> -->
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { store } from "./js/store";
import Filter from "./components/Filter.vue";

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
