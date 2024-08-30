import { Hono } from 'hono';
import { Bindings } from './lib/hono';
import { cors } from 'hono/cors';
import usersRoute from './routes/users';

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors({ origin: 'https://bdp-saunas.pages.dev' }));

app.get('/', async (c) => {
	return c.json({ msg: 'Welcome !' }, 200);
});

app.route('/users', usersRoute);

export default app;
