import { Hono } from 'hono';
import { Bindings } from './lib/hono';
import { cors } from 'hono/cors';
import usersRoute from './routes/users';

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors({ origin: 'http://localhost:4200' }));
app.get('/', (c) => {
	return c.json({ msg: 'Welcome !' }, 200);
});

app.route('/users', usersRoute);

export default app;
