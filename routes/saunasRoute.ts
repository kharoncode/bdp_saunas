// routes/users.js
import express from 'express';
import { dbConnection } from '../db_connection';
export const saunasRouter = express.Router();

saunasRouter
  .get('/', (req, res) => {
    const query = 'SELECT * FROM saunas';

    dbConnection.query(query, (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      return res.json(results);
    });
  })
  .post('/', (req, res) => {
    const { name, size } = req.body;
    const insertQuery = 'INSERT INTO saunas (name, size) VALUES ( ?, ?)';
    const selectQuery = 'SELECT * FROM saunas';
    const values = [name, size];

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
    const query = `UPDATE saunas SET ${setClause} WHERE id = ?`;
    const selectQuery = 'SELECT * FROM saunas';

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
    const query = `DELETE FROM saunas WHERE id = ?`;
    const selectQuery = 'SELECT * FROM saunas';

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

//module.exports = router;
