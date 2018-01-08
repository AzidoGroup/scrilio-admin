<template>
	<div id="setup">
		<h1>Setup</h1>
		<form v-on:submit.prevent v-if="!initialized">
			<fieldset>
				<label for="username" >Admin Username: </label>
				<input name="username" type="text" v-model="username" placeholder="username" />
			</fieldset>
			<fieldset>
				<label for="password">Admin Password: </label>
				<input name="password" type="password" v-model="password" placeholder="password" />
			</fieldset>
			<fieldset>
				<label for="confirmPassword">Confirm Password: </label>
				<input name="confirmPassword" type="password" v-model="confirmPassword" placeholder="password" />
			</fieldset>
			<fieldset>
				<label for="submit">Sumbit: </label>
				<input name="submit" type="submit" value="submit" v-on:click="submit" />
			</fieldset>
			<div v-if="errorMessages">
				{{errorMessages}}
			</div>
		</form>
		<div v-if="initialized">
			<span>Setup has already been initialized. @TODO - change this into a 404 page</span>
		</div>
	</div>
</template>

<script>
// import helper from './setup-helper.js';
import is from 'is_js';

export default {
	name: 'setup',
	data() {
		return {
			initialized: true,
			username: '',
			password: '',
			confirmPassword: '',
			errorMessages: ''
		}
	},
	created() {
		this.$admin.get('/api/v1/setup')
			.then(response => {
				this.initialized = response.data;
				if (this.initialized) {
					// redirects the user to the `log-in` route
					this.$router.push('/log-in');
				}
			})
			.catch(err => {
				console.error(err.messsage);
				this.errorMessages = err.message;
			});
	},
	methods: {
		submit(event) {
			if (!this.validatePassword(this.password, this.confirmPassword)) {
				this.errorMessages = 'passwords do not match'
				return;
			}
			let body = {
				username: this.username,
				password: this.password
			}
			this.$admin.post('/api/v1/setup', body)
				.then(response => {
					this.$store.dispatch('authentication/login', body)
					// redirects the user to the `main` route
					this.$router.push('/main');
				})
				.catch(err => {
					console.error(err.messsage);
					this.errorMessages = err.message;
				});
		},
		validatePassword(pw1, pw2) {
			if (is.empty(pw1) || is.empty(pw2)) {
				return false;
			}
			return pw1 === pw2;
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
