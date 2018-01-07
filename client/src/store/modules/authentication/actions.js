import Vue from 'vue';
import VueLocalStorage from 'vue-ls';
import MUTATION_TYPES from './mutation-types.js';
import axios from 'axios';

Vue.use(VueLocalStorage, {namespace: 'scrl_admin_'});

const TOKEN_NAME = 'token_key';

import { admin } from '../../../lib/http-clients.js';

// // @TODO make this part of the Vue instance
// const http = axios.create({
// 	baseURL: 'http://localhost:8090'
// });

export default {
	login({commit}, credentials) {
		// @TODO move this into a service like thing
		return admin.post('/api/v1/auth', credentials)
			.then(response => {
				let body = response.data;
				if (body.match === true) {
					Vue.ls.set(TOKEN_NAME, body.token);
					return commit(MUTATION_TYPES.LOGIN_USER, body.token);
				}
				return commit(MUTATION_TYPES.LOGOUT_USER);
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
		return admin.post('/api/v1/auth/check', {token})
			.then(response => {
				let body = response.data;
				if (body.match === true) {
					return true;
				}
				commit(MUTATION_TYPES.LOGOUT_USER);
				return false;
			})
			.catch(err => {
				throw err;
			});
	},
	logout({commit}) {
		return admin.get('/api/v1/auth/logout')
			.then(() => {
				Vue.ls.remove(TOKEN_NAME);
				commit(MUTATION_TYPES.LOGOUT_USER);
			});
	}
};
