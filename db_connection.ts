import * as mysql from 'mysql2';

// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);
// const mysql = require('mysql2');
import { ConnectionOptions, Connection } from 'mysql2';
import { host_db } from './host';

// Informations de connexion à votre base de données Alwaysdata
const dbConnection: Connection = mysql.createConnection(
  host_db as ConnectionOptions
);

dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

export { dbConnection };
