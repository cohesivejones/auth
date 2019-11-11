import { Request, Response, NextFunction } from 'express';
import * as config from '../config'
import jwt from 'jsonwebtoken'

const MOCKED_USERNAME = "MOCKED_USERNAME";
const MOCKED_PASSWORD = "MOCKED_PASSWORD";

const createToken = (username: string) => jwt.sign(
  { username }, 
  config.secret, 
  { expiresIn: '24h' }
);
const validUser = (username: string, password: string) => (
  username === MOCKED_USERNAME && password === MOCKED_PASSWORD
);
export function login(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body;
  if ( validUser(username, password) ) {
    res.status(201).json({ message: 'Authentication success', token: createToken(username) });
  } else {
    res.status(403).json({ message: 'Authentication failed' });
  }
  return next();
};
export function verify(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: 'Auth token invalid' });
        return next();
      } else {
        res.status(200).json({ message: 'Auth token valid' });
        return next();
      }
    });
  } else {
    res.status(401).json({ message: 'Auth token not supplied' });
    return next();
  }
};

