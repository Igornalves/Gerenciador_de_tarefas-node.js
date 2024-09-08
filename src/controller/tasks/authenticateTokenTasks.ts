import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../configs/JwtConfig';

export function authenticateTokenTasks(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acesso não autorizado. Token não fornecido.' });
    }

    jwt.verify(token, jwtSecret, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido ou expirado.' });
        }

        req.user = {
            id: user.id,
            username: user.username
        }; // Configurando o objeto user com id e username
        next();
    });
}
