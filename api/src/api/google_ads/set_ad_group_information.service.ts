import { FastifyRequest, FastifyReply } from "fastify";
import { Static } from '@sinclair/typebox';
import { TypedFastifyInstance } from "@/types/types";
import { setAdGroupInformationSchema } from "@/api/google_ads/set_ad_group_information.schema";

export async function setAdGroupInformation(
    fastify: TypedFastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply,
    body: Static<typeof setAdGroupInformationSchema.body>
) {

    for (const adGroup of body) {

        const row_updated_at = new Date();
        const ad_account_id = adGroup.resourceName.split("/")[1];
        const campaign_id = typeof adGroup.campaign === "string" ? adGroup.campaign.split("/").pop() : adGroup.campaign?.id || null;
        const campaign_resource_name = typeof adGroup.campaign === "string" ? adGroup.campaign : adGroup.campaign?.resourceName || null;

        const adGroupData = {
            ad_group_resource_name: adGroup.name,
            base_ad_group: adGroup.baseAdGroup,
            ad_account_id: ad_account_id,
            campaign_id: campaign_id,
            campaign_resource_name: campaign_resource_name,
            status: adGroup.status,
            type: adGroup.type,
            full_details: JSON.stringify(adGroup),
            row_updated_at: row_updated_at,
        }

        // Check if the ad already exists
        const isExisting = await fastify.mainDB
            .selectFrom("integrations.google_ads_ad_group_information")
            .where("ad_group_id", "=", adGroup.id)
            .selectAll()
            .executeTakeFirst();

        // Update if exists, otherwise insert
        if (isExisting) {
            await fastify.mainDB
                .updateTable("integrations.google_ads_ad_group_information")
                .set(adGroupData)
                .where("ad_group_id", "=", adGroup.id)
                .executeTakeFirstOrThrow();
        } else {
            await fastify.mainDB
                .insertInto("integrations.google_ads_ad_group_information")
                .values({
                    ad_group_id: adGroup.id,
                    row_created_at: row_updated_at,
                    ...adGroupData,
                })
                .executeTakeFirstOrThrow();
        }
    }
    return { status: "OK" };
}
