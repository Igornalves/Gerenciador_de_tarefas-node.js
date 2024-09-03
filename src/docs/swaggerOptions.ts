export const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Minha API Express',
        version: '1.0.0',
        description: 'Documentação gerada dinamicamente pela API Express com Swagger',
      },
    },
    // Caminho onde as rotas são documentadas
    // ajuste conforme a localização das suas rotas
    apis: ['../src/routes/all.routes.ts']
};
