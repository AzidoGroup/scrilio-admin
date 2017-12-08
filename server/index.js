'use strict';

const config = require('./config');
const cors = require('cors');
const express = require('express');
const path = require('path');

const server = express();

let list = [ 'zero', 'one', 'two', 'three', 'four', 'five' ];
let json = list.map((i, indx) => {
	return {id: indx, name: i};
});

server.engine('html', require('ejs').renderFile);
server.set('views', path.join(__dirname, config.client.path));
server.set('view engine', 'html');
server.use(express.static(path.join(__dirname, config.client.path)));

// load up the CORS settings
server.use(cors());
server.all('*', (req, res, next) => {
	console.log(req.method, req.url);
	return next();
});

server.get('/', (req, res) => {
	return res.json({message: 'server'});
});

server.get('/list', (req, res) => {
	return res.json(json);
});

server.get('/list/:id', (req, res) => {
	return res.json(json[req.params.id]);
});

server.listen(config.application.port, () => {
	console.log(`Scrilio Admin Server listening on port: ${config.application.port}`);
});
