import { FastifyRequest, FastifyReply } from "fastify";
import { Static } from '@sinclair/typebox';
import { TypedFastifyInstance } from "@/types/types";
import { setAdGroupReportSchema } from "@/api/google_ads/set_ad_group_report.schema";

export async function setAdGroupReport(
    fastify: TypedFastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply,
    body: Static<typeof setAdGroupReportSchema.body>
) {

    for (const report of body) {

        const row_updated_at = new Date();
        const report_date = new Date(report.segments_date);

        const ad_group_id = report.adGroup_id;
        const campaign_id = report.campaign_id;
        const ad_account_id = report.customer_id;

        const reportData = {
            campaign_id: campaign_id,
            ad_account_id: ad_account_id,
            full_details: JSON.stringify(report),
            row_updated_at: row_updated_at,
        }

        // Check if the ad already exists
        const isExisting = await fastify.mainDB
            .selectFrom("integrations.google_ads_ad_group_report")
            .where("ad_group_id", "=", ad_group_id)
            .where("date", "=", report_date)
            .selectAll()
            .executeTakeFirst();

        // Update if exists, otherwise insert
        if (isExisting) {
            await fastify.mainDB
                .updateTable("integrations.google_ads_ad_group_report")
                .set(reportData)
                .where("ad_group_id", "=", ad_group_id)
                .executeTakeFirstOrThrow();
        } else {
            await fastify.mainDB
                .insertInto("integrations.google_ads_ad_group_report")
                .values({
                    ad_group_id: ad_group_id,
                    date: report_date,
                    row_created_at: row_updated_at,
                    ...reportData,
                })
                .executeTakeFirstOrThrow();
        }
    }
    return { status: "OK" };
}
