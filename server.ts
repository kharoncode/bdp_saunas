import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { dbConnection } from './db_connection';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server
    .get('/api/saunas', (req, res) => {
      const query = 'SELECT * FROM saunas';

      dbConnection.query(query, (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        return res.json(results);
      });
    })
    .post('/api/saunas', (req, res) => {
      const { name, size, customers } = req.body;
      const insertQuery =
        'INSERT INTO saunas (name, size, customers) VALUES ( ?, ?, ?)';
      const selectQuery = 'SELECT * FROM saunas';
      const values = [name, size, customers];

      dbConnection.query(insertQuery, values, (insertError) => {
        if (insertError) {
          res.status(500).json({ error: insertError.message });
          return;
        }

        // Si l'insertion réussit, récupérez la liste mise à jour des saunas
        dbConnection.query(selectQuery, (selectError, results) => {
          if (selectError) {
            res.status(500).json({ error: selectError.message });
            return;
          }
          res.status(201).json(results);
        });
      });
    });

  server.get('/api/isFull', (req, res) => {
    const query = 'SELECT * FROM saunas where customers < size';

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
