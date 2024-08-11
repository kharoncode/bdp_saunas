// routes/users.js
import express from 'express';
export const usersRoute = express.Router();

// Route GET pour obtenir les utilisateurs
usersRoute.get('/', (req, res) => {
  res.send('Liste des utilisateurs');
});

// Route POST pour créer un nouvel utilisateur
usersRoute.post('/', (req, res) => {
  const newUser = req.body;
  res.status(201).send(`Utilisateur créé : ${JSON.stringify(newUser)}`);
});

// Route PUT pour mettre à jour un utilisateur
usersRoute.put('/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  res.send(
    `Utilisateur ${userId} mis à jour avec : ${JSON.stringify(updatedUser)}`
  );
});

// Route DELETE pour supprimer un utilisateur
usersRoute.delete('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Utilisateur ${userId} supprimé`);
});

//module.exports = router;
