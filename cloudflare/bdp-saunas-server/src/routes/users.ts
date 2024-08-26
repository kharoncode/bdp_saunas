import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { Bindings } from '../lib/hono';

const usersRoute = new Hono<{ Bindings: Bindings }>();

usersRoute
	.get('/', async (c) => {
		const db = drizzle(c.env.DB);
		const resp = await db.select().from(users).all();
		return c.json(resp);
	})
	.post('/', async (c) => {
		try {
			const db = drizzle(c.env.DB);
			const user = await c.req.json();
			user.password = bcrypt.hashSync(user.password, 10);
			const resp = await db.insert(users).values(user).returning();
			const allUsers = await db.select().from(users);
			return c.json(allUsers, 200);
		} catch (error) {
			console.error("Erreur lors de la création de l'utilisateur:", error);
			if (error instanceof Error && error.message.includes('UNIQUE constraint failed: users.mail')) {
				return c.json({ error: 'Cet email est déjà utilisé.' }, 400);
			}
			return c.json({ error: "Une erreur s'est produite lors de la création de l'utilisateur." }, 500);
		}
	})
	.patch('/', async (c) => {
		try {
			const db = drizzle(c.env.DB);
			const { id, password, data } = await c.req.json();
			if (!id) {
				return c.json({ error: 'Un ID est requis.' }, 400);
			}

			if (password) {
				const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
				const validPassword = bcrypt.compareSync(password, user[0].password);
				if (!validPassword) {
					return c.json({ error: 'Invalid password.' }, 400);
				}
				data.password = bcrypt.hashSync(data.password, 10);
			}

			const resp = await db.update(users).set(data).where(eq(users.id, id)).returning();

			if (resp.length > 0) {
				const allUsers = await db.select().from(users);
				return c.json(allUsers, 200);
			} else {
				return c.json({ error: 'Aucune modification effectuée.' }, 400);
			}
		} catch (error) {
			console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
			return c.json({ error: "Une erreur s'est produite lors de la mise à jour de l'utilisateur." }, 500);
		}
	})
	.delete('/', async (c) => {
		try {
			const db = drizzle(c.env.DB);
			const { id } = await c.req.json();
			if (!id) {
				return c.json({ error: 'Un ID est requis.' }, 400);
			}
			const resp = await db.delete(users).where(eq(users.id, id)).returning();
			if (resp.length > 0) {
				const allUsers = await db.select().from(users);
				return c.json(allUsers, 200);
			} else {
				return c.json({ error: 'Aucune modification effectuée.' }, 400);
			}
		} catch (error) {
			console.log(error);
		}
	});

export default usersRoute;
