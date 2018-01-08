import SiteList from './SiteList.vue';
import SiteItemEdit from './SiteItemEdit.vue';

const components = {
	SiteList,
	SiteItemEdit
};

const routes = {
	SiteList: {
		path: '/sites',
		name: 'sites',
		component: SiteList,
		meta: {
			auth: true,
			title: 'Sites: List',
		}
	},
	SiteItemEdit: {
		path: '/sites/:id',
		name: 'sites-item-edit',
		props: true, // allows for the `id` to be passed into the component
		component: SiteItemEdit,
		meta: {
			auth: true,
			title: 'Sites: Edit - '
		}
	}
};

export default {
	components,
	routes
};
