
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
			auth: true
		}
	}
];

const router = new VueRouter({
	routes
});

router.beforeEach(function (to, from, next) {
	let auth = to.matched.some(record => {
		return record.meta.auth;
	});

	if (auth) {
		return Store.store.dispatch('checkStatus', Store.store.getters.token)
			.then(res => {
				if (res) {
					return next();
				}
				Store.store.dispatch('logout');
				return router.push('/log-in');
			});
	}

	return next();
});

export default router;
