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
			<fieldset v-if="errorMessages">
				<span>{{errorMessages}}</span>
			</fieldset>
		</form>
	</div>
</template>

<script>

export default {
	name: 'login',
	data() {
		return {
			username: '',
			password: '',
			errorMessages: ''
		};
	},
	methods: {
		submit: function (event) {
			let body = {
				username: this.username,
				password: this.password
			};
			this.$store.dispatch('authentication/login', body)
				.then(() => {
					this.$router.push('/protected');
				})
				.catch(err => {
					console.error(err.message);
					this.errorMessages = err.response.data.error.message;
				});
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
