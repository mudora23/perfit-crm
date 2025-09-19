import { FastifyInstance } from 'fastify';

export default async (fastify: FastifyInstance) => {

    // FB routes
    await fastify.register(import("@/api/fb_leads_routes"), { prefix: `/fb_leads` });

    // website routes
    await fastify.register(import("@/api/website_routes"), { prefix: `/website` });

    // perfitAPI routes
    await fastify.register(import("@/api/perfit_routes"), { prefix: `/perfit` });

}