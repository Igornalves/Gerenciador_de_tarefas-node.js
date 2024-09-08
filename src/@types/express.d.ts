// src/types/express.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      username: string;
    } | JwtPayload;
  }
}

