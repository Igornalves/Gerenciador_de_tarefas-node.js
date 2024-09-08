export const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Minha API Express',
        version: '1.0.5',
        description: 'Documentação gerada dinamicamente pela API Express com Swagger, essa documentacao é de um sistema de gerenciamente de tarefas utilizando tecnologias para a Vaga de Estagio',
      },
    },
    // Caminho onde as rotas são documentadas
    // ajuste conforme a localização das suas rotas
    apis: ['./src/routes/all.routes.ts']
};
