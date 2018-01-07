import config from '../config';
import axios from 'axios';

const api = axios.create({
	baseURL: `${config.api.protocol}://${config.api.host}:${config.api.port}`,
	auth: config.api.auth
});

const admin = axios.create({
	baseURL: `${config.admin.protocol}://${config.admin.host}:${config.admin.port}`,
	auth: config.admin.auth
});

export {
	api,
	admin
};
