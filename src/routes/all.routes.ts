import { Router } from 'express'
import express from 'express'
import cors from 'cors';
import { CriandoUser } from '../controller/users/Criando'
import { DeletarUser } from '../controller/users/Deletando'
import { CriandoTask } from '../controller/tasks/Criando'
import { DeletarTask } from '../controller/tasks/Deletando'
import { ListandoTask } from '../controller/tasks/Listando'
import { ListandoUsers } from '../controller/users/Listando'
import { authenticateUser } from '../controller/users/Autenticando';
import { editandoTaks } from '../controller/tasks/Editando';

export const allRoutes = Router()

// allRoutes.use(cors({
//     origin: 'http://192.168.1.102:5173', // Permita apenas o front-end acessar
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
//     allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
// }));

allRoutes.use(cors({ 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));
allRoutes.use(express.json());

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

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: maizena
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login bem-sucedido!"
 *                 token:
 *                   type: string
 *                   example: "JWT-TOKEN-AQUI"
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro ao processar a solicitação
 */
allRoutes.post('/login', authenticateUser);

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
allRoutes.post('/CriandoTasks', (req, res, next) => {
    console.log('Requisição recebida em /CriandoTasks:', req.body);
    next();
}, CriandoTask);

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

/**
 * @openapi
 * /tasks/editar/{id}:
 *   patch:
 *     summary: Atualiza o status de conclusão de uma tarefa existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa a ser atualizada
 *     requestBody:
 *       description: Dados para atualizar a tarefa
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               concluida:
 *                 type: boolean
 *                 description: Novo status de conclusão da tarefa
 *           examples:
 *             Atualizar Apenas o Status de Conclusão:
 *               summary: Atualiza somente o status de conclusão da tarefa
 *               value:
 *                 concluida: true
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                 updatedTask:
 *                   type: object
 *                   description: Dados da tarefa atualizada
 *       400:
 *         description: O campo 'concluida' deve ser fornecido para atualização
 *       500:
 *         description: Erro ao atualizar a tarefa
 */
allRoutes.patch('/tasks/editar/:id', editandoTaks)

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


