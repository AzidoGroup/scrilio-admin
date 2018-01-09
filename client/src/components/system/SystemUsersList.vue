<template>
	<div id="system-users-list">
		<h1>System Users </h1>
		<div class="sub-menu">
			<ul>
				<li>System</li>
				<li>System Users</li>
			</ul>
		</div>
		<table>
			<tr>
				<th>ID</th>
				<th>Username</th>
				<th>Email</th>
				<th></th>
			</tr>
			<tr v-for="user in users">
				<td>{{user.id}}</td>
				<td>{{user.username}}</td>
				<td>{{user.email}}</td>
				<td>
					<router-link :to="`/system/users/${user.id}`">Edit</router-link>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>

export default {
	name: 'system-users-list',
	data() {
		return {
			count: 0,
			users: []
		}
	},
	created() {
		this.$admin.get('/api/v1/users')
			.then(response => {
				console.log(response.data);
				this.users = response.data;
			});
	}
};
</script>

<style lang="scss" scoped>
</style>
