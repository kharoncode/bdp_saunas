import jwt from 'jsonwebtoken';
import { JWT_SK, JWT_SK_R } from '../host';

export const generateTokens = (id:string,username:string,password:string) =>{
    const accessToken = jwt.sign({id,username,password},JWT_SK,{expiresIn:'1d'})
    //const refreshToken = jwt.sign({ id,username,password }, JWT_SK_R, { expiresIn: '7d' });
    return { token:accessToken };
}