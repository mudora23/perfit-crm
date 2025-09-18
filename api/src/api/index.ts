import { FastifyInstance } from 'fastify';

export default async (fastify: FastifyInstance) => {

    // catch routes
    await fastify.register(import("@/api/fb_leads_routes"), { prefix: `/fb_leads` });

    // perfitAPI routes
    await fastify.register(import("@/api/perfit_routes"), { prefix: `/perfit` });

}