import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { dbConnection } from './db_connection';
import cors from 'cors';
import { authMiddleware } from './auth/middleware';
import { usersRoute } from './routes/usersRoute';
import { saunasRouter } from './routes/saunasRoute';
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

  //const userRoutes = require('./routes/usersRoute');
  //const saunaRoutes = require('./routes/saunasRoute');
  server.use('/api/users', usersRoute);
  server.use('/api/saunas', authMiddleware, saunasRouter);

  // server
  //   .get('/api/saunas', (req, res) => {
  //     const query = 'SELECT * FROM saunas';

  //     dbConnection.query(query, (error, results) => {
  //       if (error) {
  //         return res.status(500).json({ error: error.message });
  //       }
  //       return res.json(results);
  //     });
  //   })
  //   .post('/api/saunas', (req, res) => {
  //     const { name, size, customers } = req.body;
  //     const insertQuery =
  //       'INSERT INTO saunas (name, size, customers) VALUES ( ?, ?, ?)';
  //     const selectQuery = 'SELECT * FROM saunas';
  //     const values = [name, size, customers];

  //     dbConnection.query(insertQuery, values, (insertError) => {
  //       if (insertError) {
  //         res.status(500).json({ error: insertError.message });
  //         return;
  //       }

  //       dbConnection.query(selectQuery, (selectError, results) => {
  //         if (selectError) {
  //           res.status(500).json({ error: selectError.message });
  //           return;
  //         }
  //         res.status(201).json(results);
  //       });
  //     });
  //   })
  //   .patch('/api/saunas', (req, res) => {
  //     const { data, id } = req.body;
  //     const setClause = Object.keys(data)
  //       .map((key) => `${key}=?`)
  //       .join(', ');
  //     const values = Object.values(data);
  //     values.push(id);
  //     const query = `UPDATE saunas SET ${setClause} WHERE id = ?`;
  //     const selectQuery = 'SELECT * FROM saunas';

  //     if (
  //       !id ||
  //       !data ||
  //       typeof data !== 'object' ||
  //       Object.keys(data).length === 0
  //     ) {
  //       res.status(400).json({ error: 'ID and data are required' });
  //       return;
  //     }

  //     dbConnection.query(query, values, (updateError) => {
  //       if (updateError) {
  //         console.error(
  //           'Erreur lors de la mise à jours des donnée : ',
  //           updateError
  //         );
  //         res.status(500).json({ error: updateError.message });
  //         return;
  //       }
  //       dbConnection.query(selectQuery, (selectError, results) => {
  //         if (selectError) {
  //           res.status(500).json({ error: selectError.message });
  //           return;
  //         }
  //         res.status(201).json(results);
  //       });
  //     });
  //   })
  //   .delete('/api/saunas', (req, res) => {
  //     const { id } = req.body;
  //     const query = `DELETE FROM saunas WHERE id = ?`;
  //     const selectQuery = 'SELECT * FROM saunas';

  //     if (!id) {
  //       res.status(400).json({ error: 'ID is required' });
  //       return;
  //     }

  //     dbConnection.query(query, [id], (error, results) => {
  //       if (error) {
  //         res.status(500).json({ error: error.message });
  //         return;
  //       }

  //       dbConnection.query(selectQuery, (selectError, selectResults) => {
  //         if (selectError) {
  //           res.status(500).json({ error: selectError.message });
  //           return;
  //         }

  //         res.status(200).json(selectResults);
  //         return;
  //       });
  //     });
  //   });

  server.get('/api/isfull', (req, res) => {
    const query = 'SELECT * FROM saunas where customers != 0';

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
