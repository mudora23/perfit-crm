import { FastifyRequest, FastifyReply } from "fastify";
import { Static } from '@sinclair/typebox';
import { TypedFastifyInstance } from "@/types/types";
import { catchStatisticsSchema } from "@/api/website/catch_statistics.schema";

export async function catchStatistics(
    fastify: TypedFastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply,
    body: Static<typeof catchStatisticsSchema.body>
) {

    const { brand, uri, uid, timestamp, action, action_object } = body;

    // Insert the statistics into the database
    await fastify.mainDB
        .insertInto("integrations.website_statistics")
        .values({
            brand: brand,
            uri: uri,
            uid: uid,
            timestamp: new Date(timestamp),
            action: action,
            action_object: action_object,
            uip: request.ip,
            user_agent: request.headers['user-agent'],
            row_created_at: new Date(),
        })
        .executeTakeFirstOrThrow();

    return { status: "OK" };

}
