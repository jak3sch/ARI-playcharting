import { reactive } from "vue";

export const store = reactive({
	data: [],
	keys: [],
	selectedPlay: [],
	setData(data) {
		this.data = data;
	},
	setKeys(keys) {
		this.keys = keys;
	},
	setSelectedPlay(play) {
		this.selectedPlay = play;
	},
});
