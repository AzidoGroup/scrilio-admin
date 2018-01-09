import SystemUsersList from './SystemUsersList.vue';

const components = {
	SystemUsersList
};

const routes = {
	SystemUsersList: {
		path: '/system/users',
		name: 'system-users-list',
		component: SystemUsersList,
		meta: {
			auth: true,
			title: 'System Users: List'
		}
	}
};

export default {
	components,
	routes
};
