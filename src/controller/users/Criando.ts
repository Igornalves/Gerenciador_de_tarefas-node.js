import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export async function CriandoUser(req: Request,res: Response) {
    try {
        const { nome, username, email, password } = req.body;

        if (!nome || !username || !email || !password) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }
        const createdUsers = await prisma.user.createMany({
            data: [
                {
                    nome,
                    username,
                    email,
                    password,
                },
            ],
        });

        return res.status(201).json({
            message: "Usuários criados com sucesso",
            createdUsers,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar usuários" });
    }
}