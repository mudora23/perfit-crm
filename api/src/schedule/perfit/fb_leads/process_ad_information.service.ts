import {TypedFastifyInstance} from "@/types/types";
import { getTable } from "@/utils/tables";
import { AsyncTask } from 'toad-scheduler';

export function run(fastify: TypedFastifyInstance) {

return new AsyncTask(
    '@/schedule/perfit/fb_leads/process_ad_information.service', async () => {

        fastify.log.info("Running perFIT FB Leads - Process Ad Information");

        const brand = "perFIT";
        const limit = 1;

        // Get Facebook Page IDs
        const fb_page_ids = await fastify.mainDB
            .selectFrom("integrations.brand_information")
            .select(["fb_page_ids"])
            .where("brand", "=", brand)
            .orderBy("id", "asc")
            .limit(limit)
            .executeTakeFirstOrThrow()
            .then(r => r.fb_page_ids ? r.fb_page_ids.split(",").map(i => i.trim()) : []);

        // Check if there's rows to process
        const rows = await fastify.mainDB
            .selectFrom("integrations.fb_leads_ad_information")
            .selectAll()
            .where("page_ids", "in", fb_page_ids)
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
                .updateTable("integrations.fb_leads_ad_information")
                .set({
                    row_proceed_start: new Date(),
                })
                .where("ad_id", "=", row.ad_id)
                .executeTakeFirstOrThrow();

            const updated_at = new Date();

            // Prepare data
            const AdData = {
                "Display_Name": (row.campaign_name || "") + " @ " + (row.adset_name || "") + " @ " + (row.ad_name || ""),
                "Ad_Name": row.ad_name,
                "Adset_Name": row.adset_name,
                "Campaign_Name": row.campaign_name,
                "Creative_Name": row.creative_name,
                "Preview_Link": row.preview_shareable_link,
                "Created_Time": row.created_time,
                "updated_at": updated_at,
            };

            // Check if the FB Ad information exists
            const adExists = await fastify.mainDB
                .selectFrom(getTable(brand, "FBAds"))
                .where("Ad_ID", "=", row.ad_id)
                .executeTakeFirst() !== undefined;

            if (adExists) {
                await fastify.mainDB
                    .updateTable(getTable(brand, "FBAds"))
                    .set(AdData)
                    .where("Ad_ID", "=", row.ad_id)
                    .executeTakeFirstOrThrow();
            } else {
                await fastify.mainDB
                    .insertInto(getTable(brand, "FBAds"))
                    .values({
                        ...AdData,
                        "Ad_ID": row.ad_id,
                        "created_at": updated_at,
                    })
                    .executeTakeFirstOrThrow();
            }

            // Mark row as processed
            await fastify.mainDB
                .updateTable("integrations.fb_leads_ad_information")
                .set({
                    row_proceed_finish: new Date(),
                    row_proceed_to_brand: brand,
                })
                .where("ad_id", "=", row.ad_id)
                .executeTakeFirstOrThrow();
        }

    }, (error: any) => {
       console.log(error);
    })

}