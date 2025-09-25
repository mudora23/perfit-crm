import {TypedFastifyInstance} from "@/types/types";
import { getTable } from "@/utils/tables";
import { AsyncTask } from 'toad-scheduler';

export function run(fastify: TypedFastifyInstance) {

return new AsyncTask(
    '@/schedule/perfit/fb_leads/process_ad_insights.service', async () => {

        fastify.log.info("Running perFIT FB Leads - Process Ad Insights");

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

        // Get Ad IDs for the Facebook Pages
        const ad_ids = await fastify.mainDB
            .selectFrom("integrations.fb_leads_ad_information")
            .select(["ad_id"])
            .where("page_ids", "in", fb_page_ids)
            .execute()
            .then(r => r.map(i => i.ad_id));

        // Check if there's rows to process
        const rows = await fastify.mainDB
            .selectFrom("integrations.fb_leads_ad_insights")
            .selectAll()
            .where("ad_id", "in", ad_ids)
            .where("row_proceed_start", "is", null)
            .orderBy("row_updated_at", "asc")
            .limit(limit)
            .execute();

        // Return if no rows to process
        if(rows.length === 0) {
            return
        }

        const formatter = new Intl.DateTimeFormat('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Hong_Kong',
        });

        for(const row of rows) {

            // Get Ad Row
            const adRow = await fastify.mainDB
                .selectFrom("integrations.fb_leads_ad_information")
                .selectAll()
                .where("ad_id", "=", row.ad_id)
                .executeTakeFirstOrThrow()
            const adFullDetails = JSON.parse(adRow.full_details as string);

            // Get Ad nocoDB Row ID
            const adCRMRowID = await fastify.mainDB
                .selectFrom(getTable(brand, "FBAds"))
                .select("id")
                .where("Ad_ID", "=", row.ad_id)
                .executeTakeFirst()
                .then(r => r?.id || null);

            // Mark row as processing
            await fastify.mainDB
                .updateTable("integrations.fb_leads_ad_insights")
                .set({
                    row_proceed_start: new Date(),
                })
                .where("date", "=", row.date)
                .where("ad_id", "=", row.ad_id)
                .executeTakeFirstOrThrow();

            const updated_at = new Date();
            const full_details = JSON.parse(row.full_details as string);

            // Prepare data
            const conversions = full_details?.conversions && Array.isArray(full_details.conversions) ? full_details.conversions.reduce((sum: number, conv: any) => sum + (conv.value || 0), 0) : 0;
            const conversions_messaging_connection = full_details?.actions?.find((action: any) => action.action_type === 'onsite_conversion.total_messaging_connection')?.value || 0;

            const insightsData = {
                "Display_Name": formatter.format(new Date(row.date)) + " @ FB @ " + (adRow?.campaign_name || "") + " @ " + (adRow?.adset_name || "") + " @ " + (adRow?.ad_name || ""),
                "Platform": "FB",
                "FB Ads_id": adCRMRowID,
                "Cost": full_details?.spend,
                "Impressions": full_details?.impressions,
                "CPM__Cost_per_1000_Impressions_": full_details?.cpm,
                "Engagements": full_details?.actions?.find((action: any) => action.action_type === 'post_engagement')?.value || null,
                "Video_Views": full_details?.video_play_actions?.find((action: any) => action.action_type === 'video_view')?.value || null,
                "Video_Views__25__": full_details?.video_p25_watched_actions?.find((action: any) => action.action_type === 'video_view')?.value || null,
                "Video_Views__50__": full_details?.video_p50_watched_actions?.find((action: any) => action.action_type === 'video_view')?.value || null,
                "Video_Views__75__": full_details?.video_p75_watched_actions?.find((action: any) => action.action_type === 'video_view')?.value || null,
                "Video_Views__95__": full_details?.video_p95_watched_actions?.find((action: any) => action.action_type === 'video_view')?.value || null,
                "Clicks": full_details?.clicks,
                "CPC__Cost_Per_Click_": full_details?.cpc,
                "CTR_for_all_clicks__Clickthrough_Rate_": full_details?.ctr,
                "CTR_for_link_clicks__Clickthrough_Rate_": full_details?.website_ctr?.find((action: any) => action.action_type === 'link_click')?.value || null,
                "Conversions": conversions + conversions_messaging_connection,

                "updated_at": updated_at,
            };

            // Check if the insights exists
            const insightsExists = await fastify.mainDB
                .selectFrom(getTable(brand, "AdsReports"))
                .where("Date", "=", row.date)
                .where("FB Ads_id", "=", adCRMRowID)
                .executeTakeFirst() !== undefined;

            if (insightsExists) {
                await fastify.mainDB
                    .updateTable(getTable(brand, "AdsReports"))
                    .set(insightsData)
                    .where("Date", "=", row.date)
                    .where("FB Ads_id", "=", adCRMRowID)
                    .executeTakeFirstOrThrow();
            } else {
                await fastify.mainDB
                    .insertInto(getTable(brand, "AdsReports"))
                    .values({
                        ...insightsData,
                        "Date": row.date,
                        "FB Ads_id": adCRMRowID,
                        "created_at": updated_at,
                    })
                    .executeTakeFirstOrThrow();
            }

            // Mark row as processed
            await fastify.mainDB
                .updateTable("integrations.fb_leads_ad_insights")
                .set({
                    row_proceed_finish: new Date(),
                    row_proceed_to_brand: brand,
                })
                .where("date", "=", row.date)
                .where("ad_id", "=", row.ad_id)
                .executeTakeFirstOrThrow();
        }

    }, (error: any) => {
       console.log(error);
    })

}