import { FastifyRequest, FastifyReply } from "fastify";
import { Static } from '@sinclair/typebox';
import { TypedFastifyInstance } from "@/types/types";
import { catchWebhookSchema } from "@/api/website/catch_webhook.schema";

export async function catchWebhook(
    fastify: TypedFastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply,
    body: Static<typeof catchWebhookSchema.body>
) {

    const { brand } = body;

    await fastify.mainDB
        .insertInto("integrations.website_webhook")
        .values({
            brand: brand,
            webhook_data: JSON.stringify(body),
            row_created_at: new Date(),
        })
        .executeTakeFirstOrThrow();

    return { status: "OK" };

}
