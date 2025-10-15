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
					<RouterLink
						:to="{ name: 'Play', params: { id: play.playId } }"
						@click="store.setSelectedPlay(play)"
					>
						<div
							class="uk-badge uk-position-top-right uk-margin-small-top uk-margin-small-right"
						>
							Q{{ play.quarter }} {{ play.time }}
						</div>
						<img :src="`./plays/${play.playId}.jpg`" alt="" />
					</RouterLink>

					<!-- <pre>{{ play }}</pre> -->
				</div>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { onMounted } from "vue";
import { store } from "@/js/store";
import Filter from "@/components/Filter.vue";
import { RouterLink } from "vue-router";

onMounted(() => {});
</script>

<style scoped></style>
