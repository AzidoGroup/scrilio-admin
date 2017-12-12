<template>
	<div id="login">
		<form method="POST" action="/login">
			<fieldset>
				<label for="username">Username: </label>
				<input name="username" type="text" placeholder="username" />
			</fieldset>
			<fieldset>
				<label for="password">Password: </label>
				<input name="password" type="password" placeholder="password" />
			</fieldset>
			<fieldset>
				<label for="submit">Sumbit: </label>
				<input name="submit" type="button" value="submit" />
			</fieldset>
		</form>
	</div>
</template>

<script>

</script>

<style lang="scss" scoped>
</style>
