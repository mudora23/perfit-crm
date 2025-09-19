import { FastifyRequest, FastifyReply } from "fastify";
import { Static } from '@sinclair/typebox';
import { TypedFastifyInstance } from "@/types/types";
import { setCampaignInformationSchema } from "@/api/google_ads/set_campaign_information.schema";

export async function setCampaignInformation(
    fastify: TypedFastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply,
    body: Static<typeof setCampaignInformationSchema.body>
) {

    for (const campaign of body) {

        const row_updated_at = new Date();
        const ad_account_id = campaign.resourceName.split("/")[1];

        const campaignData = {
            campaign_name: campaign.name,
            campaign_resource_name: campaign.resourceName,
            base_campaign: campaign.baseCampaign,
            ad_account_id: ad_account_id,
            status: campaign.status,
            serving_status: campaign.servingStatus,
            full_details: JSON.stringify(campaign),
            row_updated_at: row_updated_at,
        }

        // Check if the ad already exists
        const isExisting = await fastify.mainDB
            .selectFrom("integrations.google_ads_campaign_information")
            .where("campaign_id", "=", campaign.id)
            .selectAll()
            .executeTakeFirst();

        // Update if exists, otherwise insert
        if (isExisting) {
            await fastify.mainDB
                .updateTable("integrations.google_ads_campaign_information")
                .set(campaignData)
                .where("campaign_id", "=", campaign.id)
                .executeTakeFirstOrThrow();
        } else {
            await fastify.mainDB
                .insertInto("integrations.google_ads_campaign_information")
                .values({
                    campaign_id: campaign.id,
                    row_created_at: row_updated_at,
                    ...campaignData,
                })
                .executeTakeFirstOrThrow();
        }
    }
    return { status: "OK" };
}
