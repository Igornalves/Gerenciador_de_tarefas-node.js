import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export async function ListandoUsers(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany()

        return res.status(200).json({
            message: 'Users Listados com sucesso !!!',
            users,
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'Erro na Listagem de Users'
        })
    }
}