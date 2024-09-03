import { Router } from 'express'

export const allRoutes = Router()

allRoutes.get('/', (req,res) => {
    res.send('hello word !!!')
})

allRoutes.get('/coisa', (req,res) => {
    res.send('coisa para mim!!!')
})
