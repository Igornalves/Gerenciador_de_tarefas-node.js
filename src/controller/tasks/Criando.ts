import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function CriandoTask(req: Request, res: Response) {
    try {
        const { descricao, concluida, userId } = req.body;

        if (!descricao || typeof concluida !== "boolean") {
            return res.status(400).json({ error: "A descrição e o status de conclusão são obrigatórios" });
        }

        const createdTask = await prisma.task.create({
            data: {
                descricao,
                concluida,
                user: { connect: { id: userId } }
            },
        });

        return res.status(201).json({
            message: "Tarefa criada com sucesso",
            createdTask,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar a tarefa" });
    }
}
