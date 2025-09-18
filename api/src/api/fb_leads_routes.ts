import { FastifyInstance } from 'fastify';

async function routes (fastify: FastifyInstance, options: any) {

    fastify.register(import("@/api/fb_leads/catch_webhook"),                           { prefix: `/catch_webhook` });
    fastify.register(import("@/api/fb_leads/set_form_information"),                    { prefix: `/set_form_information` });

}

export default routes;