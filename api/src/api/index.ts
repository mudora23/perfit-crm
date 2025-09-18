import { FastifyInstance } from 'fastify';

export default async (fastify: FastifyInstance) => {

    // catch routes
    await fastify.register(import("@/api/catch_routes"), { prefix: `/catch` });

    // perfitAPI routes
    await fastify.register(import("@/api/perfit_routes"), { prefix: `/perfit` });

}