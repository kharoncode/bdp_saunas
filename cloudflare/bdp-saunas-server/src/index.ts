import { Context, Hono } from 'hono';
import { Bindings } from './lib/hono';
import { cors } from 'hono/cors';
import usersRoute from './routes/users';

const app = new Hono<{ Bindings: Bindings }>();

// app.use('*', (c, next) => {
// 	const corsOptions = {
// 		origin: c.env.CORS_ALLOWED_ORIGIN,
// 	};
// 	console.log(corsOptions);
// 	return cors(corsOptions)(c, next);
// });

//app.use('*', cors());

app.get('/', async (c) => {
	return c.json({ msg: 'Welcome !' }, 200);
});

app.route('/users', usersRoute);

export default app;
