import { FastifyInstance } from 'fastify';

async function routes (fastify: FastifyInstance, options: any) {

    // leads
    fastify.register(import("@/api/perfit/leads/process_website_webhook"),                { prefix: `/leads/process_website_webhook` });

}

export default routes;