import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerOptions } from './docs/swaggerOptions';
import swaggerJsdoc from 'swagger-jsdoc'
import { allRoutes } from './routes/all.routes';

const server = express()
const swaggerSpecs = swaggerJsdoc(swaggerOptions);

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

server.use('/', allRoutes);

server.listen(3333, () => {
    console.log('HTTP server running on port 3333 !!!')
})
