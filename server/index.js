
const config = require('./config');
const cors = require('cors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const sessionConfig = require('./lib/sessions')(config.database.knex);
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
server.use(session(sessionConfig));
// load up the CORS settings
server.use(cors());

server.use('/', require('./routes/index')(express.Router()));

server.listen(config.application.port, () => {
	console.log(`Scrilio Admin Server listening on port: ${config.application.port}`);
});
