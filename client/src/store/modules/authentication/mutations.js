import MUTATIONS from './mutation-types';

export default {
	[MUTATIONS.LOGIN_USER](state, token) {
		state.token = token;
		state.loggedIn = true;
	},
	[MUTATIONS.LOGOUT_USER](state) {
		state.token = undefined;
		state.loggedIn = false;
	}
};
