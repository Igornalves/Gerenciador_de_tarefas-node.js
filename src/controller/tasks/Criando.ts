import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../configs/JwtConfig';

const prisma = new PrismaClient();

export async function CriandoTask(req: Request, res: Response) {
    const { descricao, concluida } = req.body;

    if (!descricao || typeof concluida !== 'boolean') {
        return res.status(400).json({ error: "A descrição e o status de conclusão são obrigatórios" });
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
        // Decodificar o token para obter o ID do usuário
        const decoded = jwt.verify(token, jwtSecret) as { id: string };
        const userId = decoded.id;

        if (!userId) {
            return res.status(401).json({ error: "Usuário não encontrado no token" });
        }

        // Verificar se o usuário existe
        const userExists = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!userExists) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        // Criar a tarefa associada ao usuário
        const newTask = await prisma.task.create({
            data: {
                descricao,
                concluida,
                userId
            }
        });

        return res.status(201).json({ createdTask: newTask });
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        return res.status(500).json({ error: "Erro ao criar tarefa" });
    }
}
