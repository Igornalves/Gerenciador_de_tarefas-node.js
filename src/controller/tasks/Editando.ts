import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function editandoTaks(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { concluida } = req.body;

        if (concluida === undefined) {
            return res.status(400).json({ error: "O campo 'concluida' deve ser fornecido para atualização" });
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                concluida
            }
        });

        return res.status(200).json({
            message: "Tarefa atualizada com sucesso",
            updatedTask
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao atualizar a tarefa" });
    }
}