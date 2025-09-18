import { FastifyRequest, FastifyReply } from "fastify";
import { Static } from '@sinclair/typebox';
import { TypedFastifyInstance, JsonObject } from "@/types/types";
import { fbLeadWebhookSchema } from "@/api/catch/fb_lead_webhook.schema";

export async function catchFbLeadWebhook(
    fastify: TypedFastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply,
    body: Static<typeof fbLeadWebhookSchema.body>
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
