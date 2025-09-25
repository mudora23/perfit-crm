import { FastifyRequest, FastifyReply } from "fastify";
import { Static } from '@sinclair/typebox';
import { TypedFastifyInstance } from "@/types/types";
import { setAdInsightsSchema } from "@/api/fb_leads/set_ad_insights.schema";

export async function setAdInsights(
    fastify: TypedFastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply,
    body: Static<typeof setAdInsightsSchema.body>
) {

    for (const ad_insights of body) {

        const formatter = new Intl.DateTimeFormat('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Hong_Kong',
        });

        const row_updated_at = new Date();
        const insights_date = new Date(formatter.format(new Date(ad_insights.date_start)));

        const adInsightsData = {
            ad_account_id: ad_insights.ad_account_id,
            full_details: JSON.stringify(ad_insights),
            row_updated_at: row_updated_at,
        }

        // Check if the ad already exists
        const isExisting = await fastify.mainDB
            .selectFrom("integrations.fb_leads_ad_insights")
            .where("ad_id", "=", ad_insights.ad_id)
            .where("date", "=", insights_date)
            .selectAll()
            .executeTakeFirst();

        // Update if exists, otherwise insert
        if (isExisting) {
            await fastify.mainDB
                .updateTable("integrations.fb_leads_ad_insights")
                .set(adInsightsData)
                .where("ad_id", "=", ad_insights.ad_id)
                .where("date", "=", insights_date)
                .executeTakeFirstOrThrow();
        } else {
            await fastify.mainDB
                .insertInto("integrations.fb_leads_ad_insights")
                .values({
                    ad_id: ad_insights.ad_id,
                    date: insights_date,
                    row_created_at: row_updated_at,
                    ...adInsightsData,
                })
                .executeTakeFirstOrThrow();
        }
    }
    return { status: "OK" };
}
