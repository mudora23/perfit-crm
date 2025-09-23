import {TypedFastifyInstance} from "@/types/types";
import { getTable } from "@/utils/tables";
import { AsyncTask } from 'toad-scheduler';

export function run(fastify: TypedFastifyInstance) {

return new AsyncTask(
    '@/schedule/perfit/google_ads/process_ad_group_report.service', async () => {

        fastify.log.info("Running perFIT Google Ads - Process Ad Group Report");

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
            .selectFrom("integrations.google_ads_ad_group_report")
            .selectAll()
            .where("ad_account_id", "in", google_ads_account_ids)
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

            // Get Ad Group Row
            const adGroupRow = await fastify.mainDB
                .selectFrom("integrations.google_ads_ad_group_information")
                .selectAll()
                .where("ad_group_id", "=", row.ad_group_id)
                .executeTakeFirstOrThrow()
            const adGroupFullDetails = JSON.parse(adGroupRow.full_details as string);

            // Get Ad Group nocoDB Row ID
            const adGroupCRMRowID = await fastify.mainDB
                .selectFrom(getTable(brand, "GoogleAds"))
                .select("id")
                .where("Ad_Group_ID", "=", row.ad_group_id)
                .executeTakeFirst()
                .then(r => r?.id || null);

            // Mark row as processing
            await fastify.mainDB
                .updateTable("integrations.google_ads_ad_group_report")
                .set({
                    row_proceed_start: new Date(),
                })
                .where("date", "=", row.date)
                .where("ad_group_id", "=", row.ad_group_id)
                .executeTakeFirstOrThrow();

            const updated_at = new Date();
            const full_details = JSON.parse(row.full_details as string);

            // Prepare data
            const reportData = {
                "Display_Name": formatter.format(new Date(row.date)) + " @ Google @ " + (adGroupFullDetails?.campaign?.name || "") + " @ " + (adGroupRow.ad_group_resource_name || ""),
                "Platform": "Google",
                "Google Ads_id": adGroupCRMRowID,
                "Cost": full_details?.metrics_costMicros ? full_details.metrics_costMicros / 1e6 : null,
                "Impressions": full_details?.metrics_impressions,
                "CPM__Cost_per_1000_Impressions_": full_details?.metrics_averageCpm ? full_details.metrics_averageCpm / 1e6 : null,
                "Engagements": full_details?.metrics_engagements,
                "Video_Views": full_details?.metrics_videoViews,
                "Clicks": full_details?.metrics_clicks,
                "CPC__Cost_Per_Click_": full_details?.metrics_averageCpc ? full_details.metrics_averageCpc / 1e6 : null,
                "CTR_for_all_clicks__Clickthrough_Rate_": full_details?.metrics_ctr,
                "Conversions": full_details?.metrics_conversions,

                "updated_at": updated_at,
            };

            // Check if the report exists
            const reportExists = await fastify.mainDB
                .selectFrom(getTable(brand, "AdsReports"))
                .where("Date", "=", row.date)
                .where("Google Ads_id", "=", adGroupCRMRowID)
                .executeTakeFirst() !== undefined;

            if (reportExists) {
                await fastify.mainDB
                    .updateTable(getTable(brand, "AdsReports"))
                    .set(reportData)
                    .where("Date", "=", row.date)
                    .where("Google Ads_id", "=", adGroupCRMRowID)
                    .executeTakeFirstOrThrow();
            } else {
                await fastify.mainDB
                    .insertInto(getTable(brand, "AdsReports"))
                    .values({
                        ...reportData,
                        "Date": row.date,
                        "Google Ads_id": adGroupCRMRowID,
                        "created_at": updated_at,
                    })
                    .executeTakeFirstOrThrow();
            }

            // Mark row as processed
            await fastify.mainDB
                .updateTable("integrations.google_ads_ad_group_report")
                .set({
                    row_proceed_finish: new Date(),
                    row_proceed_to_brand: brand,
                })
                .where("date", "=", row.date)
                .where("ad_group_id", "=", row.ad_group_id)
                .executeTakeFirstOrThrow();
        }

    }, (error: any) => {
       console.log(error);
    })

}