import LogIn from './LogIn.vue';
import LogOut from './LogOut.vue';
const components = {
	LogIn,
	LogOut
};

const routes = {
	LogIn: {
		path: '/log-in',
		name: 'logIn',
		component: LogIn
	},
	LogOut: {
		path: '/log-out',
		name: 'logOut',
		component: LogOut
	}
};

export default {
	components,
	routes
};
