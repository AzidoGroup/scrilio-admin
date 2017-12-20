
const config = require('./config');
const cors = require('cors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const server = express();
const hash = require('object-hash');

let list = [ 'zero', 'one', 'two', 'three', 'four', 'five' ];
let json = list.map((i, indx) => {
	return {id: indx, name: i};
});

server.engine('html', require('ejs').renderFile);
server.set('views', path.join(__dirname, config.client.path));
server.set('view engine', 'html');
server.use(express.static(path.join(__dirname, config.client.path)));

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// load up the CORS settings
server.use(cors());
server.all('*', (req, res, next) => {
	console.log(req.method, req.url);
	return next();
});

server.get('/', (req, res) => {
	return res.json({message: 'server'});
});

server.post('/api/auth', (req, res) => {
	let body = {
		username: req.body.username,
		password: req.body.password,
		token: hash.sha1({
			num: Math.random(),
			username: req.body.username,
			password: req.body.password
		}),
		success: true
	};

	return res.json(body);
});

server.post('/api/auth/check', (req, res) => {
	let body = {
		token: req.body.token,
		success: true
	};

	return res.json(body);
});

server.use('/', require('./routes/index')(express.Router()));

server.listen(config.application.port, () => {
	console.log(`Scrilio Admin Server listening on port: ${config.application.port}`);
});
