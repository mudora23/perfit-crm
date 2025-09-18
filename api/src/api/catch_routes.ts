import { FastifyInstance } from 'fastify';

async function routes (fastify: FastifyInstance, options: any) {

    // catch
    fastify.register(import("@/api/catch/fb_lead_webhook"),                           { prefix: `/fb_lead_webhook` });

}

export default routes;