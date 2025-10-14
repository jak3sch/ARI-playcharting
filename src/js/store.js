import { reactive } from "vue";

export const store = reactive({
	data: [],
	selectedPlay: [],
	setData(data) {
		this.data = data;
	},
	setSelectedPlay(play) {
		this.selectedPlay = play;
	},
});
