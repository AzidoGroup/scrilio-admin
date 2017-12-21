
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
		})
		// create the sites table first
		.createTableIfNotExists(`${config.prefix}sites`, table => {
			table.increments('id').primary();
			table.string('name', 255).unique().notNullable();
			table.string('display', 255).notNullable();
			table.string('metaDescription', 255).nullable();
			table.text('description', 'text').nullable();
			table.enu('status', siteHelper.ENUMS.STATUS).notNullable().defaultTo(siteHelper.ENUMS.STATUS[0]);
			table.index('status', 'status_index');
			table.timestamp('created').defaultTo(knex.fn.now());
			table.timestamp('modified').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
		})
		.createTableIfNotExists(`${config.prefix}scenes`, table => {
			table.increments('id').primary();
			table.string('title', 255).notNullable();
			table.text('description').nullable();
			table.boolean('featured').defaultTo(false);
			table.enu('status', ['UNPUBLISHED', 'READY', 'PUBLISHED']).defaultTo('UNPUBLISHED');
			table.date('productionDate').nullable();
			table.date('punlishDate').nullable();
			table.integer('siteId').unsigned();
			table.foreign('siteId').references('id').inTable(`${config.prefix}sites`);
			table.timestamp('created').defaultTo(knex.fn.now());
			table.timestamp('modified').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
		});
};

exports.down = knex => {
	return knex.schema
		.dropTable(`${config.prefix}admin_sessions`)
		.dropTable(`${config.prefix}admin_users`)
		.dropTable(`${config.prefix}sites`)
		.dropTable(`${config.prefix}scenes`);
};
