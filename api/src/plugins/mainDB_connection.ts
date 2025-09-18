import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin'
import { Kysely, PostgresDialect, CamelCasePlugin } from "kysely";
import { Pool } from "pg";
import { DB as MainDB } from '@/schemas_db/db_main'

declare module 'fastify' {
  interface FastifyInstance {
    mainDB: Kysely<MainDB>;
  }
}

export default fp(async (fastify: FastifyInstance) => {
  if(!fastify.mainDB) {
    const url = new URL(process.env.DATABASE_URL_MAIN as string);
    const mainDB = new Kysely<MainDB>({
      dialect: new PostgresDialect({
        pool: new Pool({
          database: url.pathname.substring(1), // remove leading slash
          host: url.hostname,
          user: url.username,
          password: url.password,
          port: Number(url.port),
          max: 10,
          ssl: {
            rejectUnauthorized: false,
          },
        }),
      }),
      plugins: [new CamelCasePlugin()],
    });
    fastify.decorate('mainDB', mainDB);
    fastify.addHook('onClose', async (fastify) => {
      if (fastify.mainDB === mainDB) {
        await fastify.mainDB.destroy();
      }
    });
    fastify.log.info("Connected to Account database");
  }
});