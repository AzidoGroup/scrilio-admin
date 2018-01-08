
import VueRouter from 'vue-router';
import LogIn from './components/login/LogIn.vue';
import LogOut from './components/login/LogOut.vue';
import Main from './components/main/Main.vue';
import Setup from './components/setup/Setup.vue';
import SiteList from './components/sites/SiteList.vue';
import SiteItemEdit from './components/sites/SiteItemEdit.vue';
import Protected from './Protected.vue';

import Store from './store/index.js';

const routes = [
	{
		path: '/setup',
		name: 'setup',
		component: Setup
	},
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
		path: '/sites',
		name: 'sites',
		component: SiteList
	},
	{
		path: '/sites/:id',
		name: 'sites-item-edit',
		props: true,
		component: SiteItemEdit
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
		return Store.store.dispatch('authentication/checkStatus', Store.store.getters['authentication/token'])
			.then(res => {
				if (res) {
					return next();
				}
				Store.store.dispatch('authentication/logout');
				return router.push('/log-in');
			});
	}

	return next();
});

export default router;
