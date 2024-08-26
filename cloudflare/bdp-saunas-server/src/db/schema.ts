import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	firstName: text('firstName').notNull(),
	lastName: text('lastName').notNull(),
	login: text('login').notNull().unique(),
	status: integer('status', { mode: 'boolean' }).notNull(),
	password: text('password').notNull(),
	created_at: text('created_at')
		.notNull()
		.default(sql`(current_timestamp)`),
});

const saunas = sqliteTable('saunas', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	size: integer('size').notNull(),
	status: integer('status', { mode: 'boolean' }).notNull(),
	created_at: text('created_at')
		.notNull()
		.default(sql`(current_timestamp)`),
});

export { users, saunas };
