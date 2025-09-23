import {TypedFastifyInstance} from "@/types/types";
import { getTable } from "@/utils/tables";
import { AsyncTask } from 'toad-scheduler';

export function run(fastify: TypedFastifyInstance) {

return new AsyncTask(
    '@/schedule/perfit/google_ads/process_ad_group_information.service', async () => {

        fastify.log.info("Running perFIT Google Ads - Process Ad Group Information");

        const brand = "perFIT";
        const limit = 1;

        // Get Google Ads Account IDs
        const google_ads_account_ids = await fastify.mainDB
            .selectFrom("integrations.brand_information")
            .select(["google_ads_account_ids"])
            .where("brand", "=", brand)
            .orderBy("id", "asc")
            .limit(limit)
            .executeTakeFirstOrThrow()
            .then(r => r.google_ads_account_ids ? r.google_ads_account_ids.split(",").map(i => i.trim()) : []);

        // Check if there's rows to process
        const rows = await fastify.mainDB
            .selectFrom("integrations.google_ads_ad_group_information")
            .selectAll()
            .where("ad_account_id", "in", google_ads_account_ids)
            .where("row_proceed_start", "is", null)
            .where("row_updated_at", "<", new Date(Date.now() - 30 * 60 * 1000)) // after at least 30 minutes
            .orderBy("row_updated_at", "asc")
            .limit(limit)
            .execute();

        // Return if no rows to process
        if(rows.length === 0) {
            return
        }

        for(const row of rows) {

            // Mark row as processing
            await fastify.mainDB
                .updateTable("integrations.google_ads_ad_group_information")
                .set({
                    row_proceed_start: new Date(),
                })
                .where("ad_group_id", "=", row.ad_group_id)
                .executeTakeFirstOrThrow();

            const updated_at = new Date();
            const full_details = JSON.parse(row.full_details as string);
            const getStartDate = async () => {
                // Get campaign start date
                const campaign = await fastify.mainDB
                    .selectFrom("integrations.google_ads_campaign_information")
                    .select("full_details")
                    .where("campaign_id", "=", row.campaign_id)
                    .executeTakeFirst();
                if(campaign) {
                    const campaign_details = JSON.parse(campaign.full_details as string);
                    if(campaign_details?.startDate) {
                        return campaign_details.startDate;
                    }
                }
            }

            // Prepare data
            const adData = {
                "Display_Name": (full_details?.campaign?.name || "") + " @ " + (row.ad_group_resource_name || ""),
                "Ad_Group_ID": row.ad_group_id,
                "Ad_Group_Name": row.ad_group_resource_name,
                "Campaign_Name": full_details?.campaign?.name,
                "Type": row.type,
                "Start_Date": await getStartDate(),
                "updated_at": updated_at,
            };

            // Check if the FB Ad information exists
            const adExists = await fastify.mainDB
                .selectFrom(getTable(brand, "GoogleAds"))
                .where("Ad_Group_ID", "=", row.ad_group_id)
                .executeTakeFirst() !== undefined;

            if (adExists) {
                await fastify.mainDB
                    .updateTable(getTable(brand, "GoogleAds"))
                    .set(adData)
                    .where("Ad_Group_ID", "=", row.ad_group_id)
                    .executeTakeFirstOrThrow();
            } else {
                await fastify.mainDB
                    .insertInto(getTable(brand, "GoogleAds"))
                    .values({
                        ...adData,
                        "Ad_Group_ID": row.ad_group_id,
                        "created_at": updated_at,
                    })
                    .executeTakeFirstOrThrow();
            }

            // Mark row as processed
            await fastify.mainDB
                .updateTable("integrations.google_ads_ad_group_information")
                .set({
                    row_proceed_finish: new Date(),
                    row_proceed_to_brand: brand,
                })
                .where("ad_group_id", "=", row.ad_group_id)
                .executeTakeFirstOrThrow();
        }

    }, (error: any) => {
       console.log(error);
    })

}