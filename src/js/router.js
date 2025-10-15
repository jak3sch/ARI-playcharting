import { createRouter, createWebHistory } from "vue-router";
import Home from "@/Views/Home.vue";
import Play from "@/Views/Play.vue";

// Example route components (replace with your actual components)

const routes = [
	{
		path: "/ARI-playcharting/",
		name: "Home",
		component: Home,
	},
	{
		path: "/ARI-playcharting/play/:id",
		name: "Play",
		component: Play,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
