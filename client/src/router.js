
import Login from './components/login/Login.vue';
import Main from './components/main/Main.vue';

const routes = [
	{
		path: '/login',
		component: Login
	},
	{
		path: '/',
		redirect: '/main'
	},
	{
		path: '/main',
		component: Main
	}
	// {
	// 	path: '/list',
	// 	component: List
	// },
	// {
	// 	path: '/list/:id',
	// 	component: Item,
	// 	props: {
	// 		id: true
	// 	}
	// }
];

module.exports = routes;
