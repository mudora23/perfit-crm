import { FastifyInstance } from 'fastify';

async function routes (fastify: FastifyInstance, options: any) {

    fastify.register(import("@/api/website/catch_webhook"),                           { prefix: `/catch_webhook` });
    fastify.register(import("@/api/website/catch_statistics"),                        { prefix: `/catch_statistics` });

}

export default routes;