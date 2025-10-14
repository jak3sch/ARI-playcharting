import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Play from "../views/Play.vue";

// Example route components (replace with your actual components)

const routes = [
	{
		path: import.meta.env.BASE_URL || "/",
		name: "Home",
		component: Home,
	},
	{
		path: import.meta.env.BASE_URL + ":id",
		name: "Play",
		component: Play,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
