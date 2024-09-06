import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function ListandoTask(req: Request, res: Response){
    try {
        const tasks = await prisma.task.findMany();

        return res.status(200).json({
            message: "Tarefas Listadas com Sucesso !!!",
            tasks
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: "Erro ao listar tarefas"
        })
    }
}