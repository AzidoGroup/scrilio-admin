import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const TOKEN_NAME = 'token_key';
const MUTATIONS = {
	LOGIN_USER: 'LOGIN_USER',
	LOGOUT_USER: 'LOGOUT_USER'
};

const state = {
	token: localStorage.getItem(TOKEN_NAME),
	loggedIn: !!localStorage.getItem(TOKEN_NAME)
};

const mutations = {
	[MUTATIONS.LOGIN_USER](state, token) {
		state.token = token;
		state.loggedIn = true;
	},
	[MUTATIONS.LOGOUT_USER](state) {
		state.token = undefined;
		state.loggedIn = false;
	}
};

const actions = {
	login({ commit }, credentials) {
		// @TODO move this into a service like thing
		return Vue.http.post('http://localhost:8090/api/v1/auth', credentials)
			.then(response => {
				let body = response.body;
				if (body.match === true) {
					localStorage.setItem(TOKEN_NAME, body.token);
					return commit(MUTATIONS.LOGIN_USER, body.token);
				}
				return commit(MUTATIONS.LOGOUT_USER);
			})
			.catch(err => {
				throw err;
			});
	},
	checkStatus({commit}, token) {
		if (!token) {
			return false;
		}
		// @TODO move this into a service like thing
		return Vue.http.post('http://localhost:8090/api/v1/auth/check', {token})
			.then(response => {
				let body = response.body;
				if (body.match === true) {
					return true;
				}
				commit(MUTATIONS.LOGOUT_USER);
				return false;
			})
			.catch(err => {
				throw err;
			});
	},
	logout({commit}) {
		localStorage.removeItem(TOKEN_NAME);
		commit(MUTATIONS.LOGOUT_USER);
	}
};

const getters = {
	token: (state) => {
		return state.token;
	},
	loggedIn: (state) => {
		return state.loggedIn;
	}
};

const store = new Vuex.Store({
	state,
	actions,
	getters,
	mutations
});

export default {
	MUTATIONS,
	store,
	install(Vue) {
		Vue.prototype.$store = store;
	}
};
