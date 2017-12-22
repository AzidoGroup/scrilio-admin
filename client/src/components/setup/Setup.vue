<template>
	<div id="setup">
		<h1>Setup</h1>
		<form method="POST" action="/setup">
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
				<input name="submit" type="button" value="submit" v-on:click="submit" />
			</fieldset>
			<div v-if="errorMessages">
				{{errorMessages}}
			</div>
		</form>
	</div>
</template>

<script>
// import helper from './setup-helper.js';
import is from 'is_js';

export default {
	name: 'setup',
	data() {
		return {
			username: '',
			password: '',
			confirmPassword: '',
			errorMessages: ''
		}
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
			this.$http.post('http://localhost:8090/api/v1/auth/setup', body)
				.then(response => {
					console.log(response);
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
