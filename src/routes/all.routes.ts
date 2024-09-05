import { Router } from 'express'
import express from 'express'
import { CriandoUser } from '../controller/users/Criando'
import { DeletarUser } from '../controller/users/Deletando'
import { CriandoTask } from '../controller/tasks/Criando'

export const allRoutes = Router()

allRoutes.get('/', (req,res) => {
    res.send('hello word !!!')
})

allRoutes.get('/coisa', (req,res) => {
    res.send('coisa para mim!!!')
})

allRoutes.use(express.json());
allRoutes.post('/CriandoUser', CriandoUser)

allRoutes.use(express.json());
allRoutes.delete("/users/:id", DeletarUser);

allRoutes.use(express.json()); 
allRoutes.post("/CriandoTasks", CriandoTask);