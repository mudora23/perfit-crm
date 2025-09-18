import { FastifyRequest, FastifyReply } from "fastify";
import { Static } from '@sinclair/typebox';
import { TypedFastifyInstance } from "@/types/types";
import { catchWebhookSchema } from "@/api/fb_leads/catch_webhook.schema";

export async function catchWebhook(
    fastify: TypedFastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply,
    body: Static<typeof catchWebhookSchema.body>
) {

    const { leadgenId, formId, formName, dateCreated, adId, pageId, adGroupId, platform, isOrganic, data } = body;

    await fastify.mainDB
        .insertInto("integrations.fb_leads_webhook")
        .values({
            lead_id: leadgenId,
            form_id: formId,
            page_id: pageId,
            ad_id: adId,
            ad_group_id: adGroupId,
            platform: platform,
            is_organic: isOrganic === "true",
            webhook_data: JSON.stringify(data),
            row_created_at: new Date(),
        })
        .executeTakeFirstOrThrow();

    return { status: "OK" };

}
