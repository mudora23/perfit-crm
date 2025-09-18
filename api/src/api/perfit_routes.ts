import { FastifyInstance } from 'fastify';

async function routes (fastify: FastifyInstance, options: any) {

    // leads
    fastify.register(import("@/api/perfit/leads/automate_import_from_website"),                { prefix: `/leads/automate_import_from_website` });

}

export default routes;