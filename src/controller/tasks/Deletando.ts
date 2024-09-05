import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function DeletarTask(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "O ID da tarefa é obrigatório" });
        }

        const task = await prisma.task.findUnique({
            where: { id },
        });

        if (!task) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }

        await prisma.task.delete({
            where: { id },
        });

        return res.status(200).json({ 
            message: "Tarefa deletada com sucesso" 
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: "Erro ao deletar a tarefa" 
        });
    }
}
