<template>
	<div id="login">
		<form method="POST" action="/login">
			<fieldset>
				<label for="username" >Username: </label>
				<input name="username" type="text" v-model="username" placeholder="username" />
			</fieldset>
			<fieldset>
				<label for="password">Password: </label>
				<input name="password" type="password" v-model="password" placeholder="password" />
			</fieldset>
			<fieldset>
				<label for="submit">Sumbit: </label>
				<input name="submit" type="button" value="submit" v-on:click="submit" />
			</fieldset>
		</form>
	</div>
</template>

<script>

// import store from '../../store';

export default {
	name: 'login',
	data() {
		return {
			username: '',
			password: ''
		};
	},
	methods: {
		submit: function (event) {
			let body = {
				username: this.username,
				password: this.password
			};

			this.$http.post('http://localhost:8090/user', body)
				.then(function (result) {
					localStorage.setItem('token_key', result.body.token);
					this.$store.commit('LOGIN_USER');
					console.log(result.body);
				})
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
