import { FastifyRequest, FastifyReply } from "fastify";
import { Static } from '@sinclair/typebox';
import { TypedFastifyInstance } from "@/types/types";
import { getAdAccountConfigsSchema } from "@/api/google_ads/get_ad_account_configs.schema";

export async function getAdAccountConfigs(
    fastify: TypedFastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply,
    body: Static<typeof getAdAccountConfigsSchema.body>
) {

    return await fastify.mainDB
        .selectFrom("integrations.google_ads_account_config")
        .select(["ad_account_id", "is_enabled"])
        .execute();

}
