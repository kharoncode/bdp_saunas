import express from 'express';
import { dbConnection } from '../db_connection';
import { User } from '../src/app/service/type/users';
import bcrypt from 'bcryptjs';
import { generateTokens } from '../auth/jwt';
export const loginRoute = express.Router();

loginRoute
  .post('/', async (req, res) => {
    const { username, password } = req.body;


    const userQuery = 'SELECT * FROM users where username= ? LIMIT 1 ';

    dbConnection.query(userQuery, async (selectError:any, results:User[]) => {
        if (selectError) {
          res.status(500).json({ error: selectError.message });
          return;
        }
        const user = results[0];

        if(!user){
            return res.status(400).json({message:'Username or password invalid !'})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Username or password invalid !' });
        }

        const token = generateTokens(user.id,username,password);

        return res.status(200).json(token);
        });

  })
  
