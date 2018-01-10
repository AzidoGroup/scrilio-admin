<template>
	<div id="site-item-edit">
		<h1>Edit Site: {{site.name}}</h1>
		<div>
			<form method="POST" action="/site-item-edit">
				<p>
					<label for="name">name: </label>
					<input v-model="site.name" type="text" name="name" />
				</p>
				<p>
					<label for="display">display name: </label>
					<input v-model="site.display" type="text" name="display" />
				</p>
				<p>
					<label for="metaDescription">meta description: </label>
					<br />
					<textarea name="metaDescription" v-model="site.metaDescription" ></textarea>
				</p>
				<p>
					<label for="description">description: </label>
					<br />
					<textarea name="description" v-model="site.description" ></textarea>
				</p>
				<p>
					<label for="status">status: </label>
					<input v-model=site.status type="text" name="status" />
				</p>
				<p>
					<input name="submit" type="button" value="submit changes" v-on:click="submit" />
				</p>
			</form>
		</div>
	</div>
</template>

<script>

export default {
	name: 'site-item-edit',
	props: ['id'],
	data() {
		return {
			site: {}
		}
	},
	created() {
		document.title = 'Site: Edit - ';
		this.$api.get('/api/v1/sites/' +  this.id)
			.then(response => {
				this.site = response.data;
				// set the title of the page
				document.title += this.site.name;
			});
	},
	methods: {
		submit(event) {
			let body = {
				name: this.site.name,
				display: this.site.display,
				metaDescription: this.site.metaDescription,
				description: this.site.description,
				status: this.site.status
			};
			this.$api.patch('/api/v1/sites/' + this.site.id, body)
				.then(response => {
					console.log(response);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
#sitelist {
	border: 1px solid blue;
	margin: 5px;
	padding: 5px;
}
</style>
