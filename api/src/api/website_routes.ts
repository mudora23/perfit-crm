import { FastifyInstance } from 'fastify';

async function routes (fastify: FastifyInstance, options: any) {

    fastify.register(import("@/api/website/catch_webhook"),                           { prefix: `/catch_webhook` });

}

export default routes;