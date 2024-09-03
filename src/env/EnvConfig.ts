import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development','test','production']).default('production'),
    // DATABASE_CLIENT: z.string(),
    // HOST_DB: z.string(),
    // USER_DB: z.string(),
    // PORT_DB: z.string(),
    // PASSWORD_DB: z.string(),
    // DATABASE_NAME: z.string(),
    // JWT_SECRET: z.string()
    PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.log(
      '⚠️ Variavel da config invalida ou indefinida !!!',
      _env.error.format(),
    )
  
    throw new Error('Variavel da config invalida ou indefinida')
}

export const env = _env.data
