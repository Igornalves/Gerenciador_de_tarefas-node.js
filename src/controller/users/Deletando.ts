import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function DeletarUser(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID do usuário é obrigatório" });
        }

        const deletedUser = await prisma.user.delete({
            where: {
                id: id
            },
        });

        return res.status(200).json({
            message: "Usuário deletado com sucesso",
            deletedUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao deletar usuário" });
    }
}
