import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'; 
import { jwtSecret } from '../../configs/JwtConfig';

const prisma = new PrismaClient();

export async function authenticateUser(req: Request, res: Response) {
    console.log('Requisição recebida:', req.body);

    const { username, password } = req.body;

    if (!username || !password) {
        console.log('Username ou senha faltando.');
        return res.status(400).json({ error: 'Username e senha são obrigatórios.' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { username }
        });

        console.log('Usuário encontrado:', user);

        if (!user) {
            console.log('Usuário não encontrado.');
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.log('Senha incorreta.');
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }

        const expiresIn = '1d'; 
        const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn });

        const expirationDate = new Date();
        expirationDate.setSeconds(expirationDate.getSeconds() + 86400); 

        console.log('Login bem-sucedido!');

        return res.json({ 
            message: 'Login bem-sucedido!', 
            token,
            expiration: expirationDate.toISOString() 
        });
    } catch (error) {
        console.error('Erro ao tentar autenticar:', error);
        return res.status(500).json({ error: 'Erro ao tentar autenticar. Tente novamente mais tarde.' });
    }   
}

