import { Session, User } from 'lucia';
import { lucia } from './lucia';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { JWT_SK } from '../host';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: Session;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = req.cookies.session_id; // Assurez-vous que le cookie contient l'ID de session

    if (!sessionId) {
      return res.status(401).send('Non authentifié'); // Retourne une réponse
    }

    // Vérification de la session avec Lucia
    const { session, user } = await lucia.validateSession(sessionId);
    //const session = await lucia.sessions.read(sessionId);

    if (!session) {
      return res.status(401).send('Session invalide'); // Retourne une réponse
    }

    // Récupération de l'utilisateur associé à la session
    // const user = await lucia.users.read(session.user_id);

    if (!user) {
      return res.status(401).send('Utilisateur non trouvé'); // Retourne une réponse
    }

    // Attache l'utilisateur et la session à l'objet `req` pour une utilisation ultérieure
    req.user = user;
    req.session = session;

    return next(); // Continue vers la route suivante
  } catch (error) {
    return res.status(500).send('Erreur serveur'); // Retourne une réponse en cas d'erreur
  }
};


export const authMiddlewareJWT = (req: Request, res: Response, next: NextFunction): Response | void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
      return res.status(401).json({ message: 'Token manquant' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SK as string, (err: VerifyErrors|null,user:any) => {
      if (err) {
          return res.status(403).json({ message: 'Token invalide' });
      }

      req.user = user;

      next();
      return
  });
  
};