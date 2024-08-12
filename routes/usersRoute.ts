// routes/users.js
import express from 'express';
import { dbConnection } from '../db_connection';
export const usersRoute = express.Router();

// Route GET pour obtenir les utilisateurs
usersRoute
  .get('/', (req, res) => {
    const query = 'SELECT * FROM users';

    dbConnection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.json(results);
    });
  })
  .post('/', (req, res) => {
    const { username, password } = req.body;
    const id = `${Date.now()}_${username}`;
    const insertQuery =
      'INSERT INTO users (id,username, password) VALUES (?, ?, ?)';
    const selectQuery = 'SELECT * FROM users';
    const values = [id, username, password];

    dbConnection.query(insertQuery, values, (insertError) => {
      if (insertError) {
        res.status(500).json({ error: insertError.message });
        return;
      }

      dbConnection.query(selectQuery, (selectError, results) => {
        if (selectError) {
          res.status(500).json({ error: selectError.message });
          return;
        }
        res.status(201).json(results);
      });
    });
  })
  .patch('/', (req, res) => {
    const { data, id } = req.body;
    const setClause = Object.keys(data)
      .map((key) => `${key}=?`)
      .join(', ');
    const values = Object.values(data);
    values.push(id);
    const query = `UPDATE users SET ${setClause} WHERE id = ?`;
    const selectQuery = 'SELECT * FROM users';

    if (
      !id ||
      !data ||
      typeof data !== 'object' ||
      Object.keys(data).length === 0
    ) {
      res.status(400).json({ error: 'ID and data are required' });
      return;
    }

    dbConnection.query(query, values, (updateError) => {
      if (updateError) {
        console.error(
          'Erreur lors de la mise à jours des donnée : ',
          updateError
        );
        res.status(500).json({ error: updateError.message });
        return;
      }
      dbConnection.query(selectQuery, (selectError, results) => {
        if (selectError) {
          res.status(500).json({ error: selectError.message });
          return;
        }
        res.status(201).json(results);
      });
    });
  })
  .delete('/', (req, res) => {
    const { id } = req.body;
    const query = `DELETE FROM users WHERE id = ?`;
    const selectQuery = 'SELECT * FROM users';

    if (!id) {
      res.status(400).json({ error: 'ID is required' });
      return;
    }

    dbConnection.query(query, [id], (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      dbConnection.query(selectQuery, (selectError, selectResults) => {
        if (selectError) {
          res.status(500).json({ error: selectError.message });
          return;
        }

        res.status(200).json(selectResults);
        return;
      });
    });
  });
