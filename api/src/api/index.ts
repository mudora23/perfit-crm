import { FastifyInstance } from 'fastify';
import perfitAPI from "@/api/perfit_routes";

export default async (fastify: FastifyInstance) => {

    // leadsAPI routes
    await fastify.register(perfitAPI, { prefix: `/perfit` });

}