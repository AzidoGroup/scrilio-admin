
import VueRouter from 'vue-router';
import LogIn from './components/login/LogIn.vue';
import LogOut from './components/login/LogOut.vue';
import Main from './components/main/Main.vue';
import Protected from './Protected.vue';

import Store from './store.js';

const routes = [
	{
		path: '/log-in',
		name: 'logIn',
		component: LogIn
	},
	{
		path: '/log-out',
		name: 'logOut',
		component: LogOut
	},
	{
		path: '/',
		redirect: '/main'
	},
	{
		path: '/main',
		name: 'main',
		component: Main
	},
	{
		path: '/protected',
		name: 'protected',
		component: Protected,
		meta: {
			requiresAuth: true
		}
	}
	// {
	// 	path: '/list/:id',
	// 	component: Item,
	// 	props: {
	// 		id: true
	// 	}
	// }
];

const router = new VueRouter({
	routes
});

router.beforeEach(function (to, from, next) {
	let auth = to.matched.some(record => {
		return record.meta.requiresAuth;
	});

	if (auth && Store.store.state.isLogged === false) {
		return router.push('/log-in');
	}

	return next();
});

export default router;
