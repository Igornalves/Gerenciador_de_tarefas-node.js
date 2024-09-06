import { Router } from 'express'
import express from 'express'
import cors from 'cors';
import { CriandoUser } from '../controller/users/Criando'
import { DeletarUser } from '../controller/users/Deletando'
import { CriandoTask } from '../controller/tasks/Criando'
import { DeletarTask } from '../controller/tasks/Deletando'
import { ListandoTask } from '../controller/tasks/Listando'
import { ListandoUsers } from '../controller/users/Listando'

export const allRoutes = Router()

// allRoutes.use(cors({
//     origin: 'http://192.168.1.102:5173', // Permita apenas o front-end acessar
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
//     allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
// }));

allRoutes.use(cors());

/**
 * @openapi
 * /:
 *   get:
 *     summary: Retorna uma mensagem de boas-vindas
 *     responses:
 *       200:
 *         description: Mensagem de boas-vindas
 */
allRoutes.get('/', (req,res) => {
    res.send('hello word !!!')
})

/**
 * @openapi
 * /coisa:
 *   get:
 *     summary: Retorna uma mensagem personalizada
 *     responses:
 *       200:
 *         description: Mensagem personalizada
 */
allRoutes.get('/coisa', (req,res) => {
    res.send('coisa para mim!!!')
})

allRoutes.use(express.json());
/**
 * @openapi
 * /CriandoUser:
 *   post:
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Igor
 *               username:
 *                 type: string
 *                 example: maizena
 *               email:
 *                 type: string
 *                 example: igor08@gmail.com
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Campos obrigatórios ausentes
 *       500:
 *         description: Erro ao criar usuário
 */
allRoutes.post('/CriandoUser', CriandoUser)

allRoutes.use(express.json());
/**
 * @openapi
 * /users/deletando/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "uuid-do-usuario"
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       400:
 *         description: ID do usuário ausente
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao deletar usuário
 */
allRoutes.delete("/users/deletando/:id", DeletarUser);

allRoutes.use(express.json()); 
/**
 * @openapi
 * /CriandoTasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *                 example: nova tarefa criando
 *               concluida:
 *                 type: boolean
 *                 example: false
 *               userId:
 *                 type: string
 *                 example: uuid-do-usuario
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Campos obrigatórios ausentes
 *       500:
 *         description: Erro ao criar tarefa
 */
allRoutes.post("/CriandoTasks", CriandoTask);

allRoutes.use(express.json());
/**
 * @openapi
 * /tasks/deletando/{id}:
 *   delete:
 *     summary: Deleta uma tarefa pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "uuid-da-tarefa"
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *       400:
 *         description: ID da tarefa ausente
 *       404:
 *         description: Tarefa não encontrada
 *       500:
 *         description: Erro ao deletar tarefa
 */
allRoutes.delete("/tasks/deletando/:id", DeletarTask);

allRoutes.use(express.json());
/**
 * @openapi
 * /tasks/listagem:
 *   get:
 *     summary: Lista todas as tarefas
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *       500:
 *         description: Erro ao listar tarefas
 */
allRoutes.get("/tasks/listagem", ListandoTask);

allRoutes.use(express.json());
/**
 * @openapi
 * /users/listagem:
 *   get:
 *     summary: Lista todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       500:
 *         description: Erro ao listar usuários
 */
allRoutes.get("/users/listagem", ListandoUsers);
