import { FastifyRequest, FastifyReply } from "fastify";
import { Static } from '@sinclair/typebox';
import { TypedFastifyInstance } from "@/types/types";
import { setAdInformationSchema } from "@/api/fb_leads/set_ad_information.schema";

export async function setAdInformation(
    fastify: TypedFastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply,
    body: Static<typeof setAdInformationSchema.body>
) {

    for (const ad of body) {

        const row_updated_at = new Date();

        // Get Page IDs
        const page_ids: string[] = [];
        if (ad["tracking_specs"]) {
            for (const tracking_spec of ad["tracking_specs"]) {
                if (tracking_spec["page"]) {
                    for (const page_id of tracking_spec["page"]) {
                        page_ids.push(page_id);
                    }
                }
            }
        }

        // Remove duplicates
        const unique_page_ids = Array.from(new Set(page_ids));
        const unique_page_ids_str = unique_page_ids.join(",");

        const adData = {
            ad_name: ad.name,
            ad_account_id: ad.account_id,
            adset_id: ad.adset?.id || null,
            adset_name: ad.adset?.name || null,
            campaign_id: ad.campaign?.id || null,
            campaign_name: ad.campaign?.name || null,
            creative_id: ad.creative?.id || null,
            creative_name: ad.creative?.name || null,
            configured_status: ad.configured_status,
            effective_status: ad.effective_status,
            status: ad.status,
            preview_shareable_link: ad.preview_shareable_link || null,
            page_ids: unique_page_ids_str || null,
            full_details: JSON.stringify(ad),
            created_time: new Date(ad.created_time),
            updated_time: new Date(ad.updated_time),
            row_updated_at: row_updated_at,
        }

        // Check if the ad already exists
        const isExisting = await fastify.mainDB
            .selectFrom("integrations.fb_leads_ad_information")
            .where("ad_id", "=", ad.id)
            .selectAll()
            .executeTakeFirst();

        // Update if exists, otherwise insert
        if (isExisting) {
            await fastify.mainDB
                .updateTable("integrations.fb_leads_ad_information")
                .set(adData)
                .where("ad_id", "=", ad.id)
                .executeTakeFirstOrThrow();
        } else {
            await fastify.mainDB
                .insertInto("integrations.fb_leads_ad_information")
                .values({
                    ad_id: ad.id,
                    row_created_at: row_updated_at,
                    ...adData,
                })
                .executeTakeFirstOrThrow();
        }
    }
    return { status: "OK" };
}
