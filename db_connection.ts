import * as mysql from 'mysql2';

// Informations de connexion à votre base de données Alwaysdata
const dbConnection = mysql.createConnection({
  host: 'mysql-username.alwaysdata.net',
  user: 'kharon',
  password: 'GloireAKeldar',
  database: 'kharon_sauna_db',
});

dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

export { dbConnection };
