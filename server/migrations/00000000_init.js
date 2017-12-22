
const config = require('../config').database.knex;
const siteHelper = require('../lib/helpers/sites-helper');

exports.up = knex => {
	return knex.schema
		.createTableIfNotExists(`${config.prefix}admin_sessions`, table => {
			table.increments('id').primary();
			table.string('sessionId', 128).notNullable();
			table.integer('expires').notNullable();
			table.text('data');
		})
		.createTableIfNotExists(`${config.prefix}admin_users`, table => {
			table.increments('id').primary();
			table.string('username', 128).notNullable();
			table.string('password', 128).notNullable();
			table.string('salt', 255).notNullable();
			table.string('token', 255).notNullable();
			table.timestamp('lastLogin');
			table.timestamp('created').defaultTo(knex.fn.now());
			table.timestamp('modified').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
		});
};

exports.down = knex => {
	return knex.schema
		.dropTable(`${config.prefix}admin_sessions`)
		.dropTable(`${config.prefix}admin_users`);
};
