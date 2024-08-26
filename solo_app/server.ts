import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { dbConnection } from './db_connection';
import cors from 'cors';
import { usersRoute } from './routes/usersRoute';
import { saunasRoute } from './routes/saunasRoute';
import { loginRoute } from './routes/loginRoute';
// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);
// const cors = require('cors');

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.use(cors());
  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use('/api/login', loginRoute);
  server.use('/api/users',usersRoute,);
  server.use('/api/saunas',saunasRoute);

  server.get('/api/isfull', (req, res) => {
    const query = 'SELECT * FROM saunas where status = 0';

    dbConnection.query(query, (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      const list = results as any[];
      const isFull = list.length === 0;

      return res.json({ isFull: isFull });
    });
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
