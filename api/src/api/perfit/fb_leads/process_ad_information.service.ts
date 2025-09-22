import { FastifyRequest, FastifyReply } from "fastify";
import { Static } from '@sinclair/typebox';
import { TypedFastifyInstance } from "@/types/types";
import { getTable } from "@/utils/tables";
import { processAdInformationSchema } from "@/api/perfit/fb_leads/process_ad_information.schema";

export async function processAdInformation(
  fastify: TypedFastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply,
  body: Static<typeof processAdInformationSchema.body>
) {

    const brand = "perFIT";

    // Get Facebook Page IDs
    const fb_page_ids = await fastify.mainDB
        .selectFrom("integrations.brand_information")
        .select(["fb_page_ids"])
        .where("brand", "=", brand)
        .orderBy("id", "asc")
        .limit(1)
        .executeTakeFirstOrThrow()
        .then(r => r.fb_page_ids ? r.fb_page_ids.split(",").map(i => i.trim()) : []);

    // Check if there's rows to process
    const rows = await fastify.mainDB
        .selectFrom("integrations.fb_leads_ad_information")
        .selectAll()
        .where("page_ids", "~", fb_page_ids)
        .where("row_proceed_start", "is", null)
        .where("row_updated_at", "<", new Date(Date.now() - 30 * 60 * 1000)) // after at least 30 minutes
        .orderBy("row_updated_at", "asc")
        .execute();

    // Return if no rows to process
    if(rows.length === 0) {
        return { status: "No rows to process" };
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

        const full_details = JSON.parse(row.full_details as string);
        const updated_at = new Date();

        // Prepare data
        const AdData = {
            "Display_Name": (row.campaign_name || "") + " - " + (row.adset_name || "") + " - " + (row.ad_name || ""),
            "Ad_name": row.ad_name,
            "Adset_Name": row.adset_name,
            "Campaign_Name": row.campaign_name,
            "Creative_Name": row.creative_name,
            "Preview_Link": row.preview_shareable_link,
            "updated_at": updated_at,
        };

        // Check if the FB Ad information exists
        const adExists = await fastify.mainDB
            .selectFrom(getTable(brand, "FBAdsLeads"))
            .where("Ad_ID", "=", row.ad_id)
            .executeTakeFirst() !== undefined;

        if (adExists) {
            await fastify.mainDB
                .updateTable(getTable(brand, "FBAdsLeads"))
                .set(AdData)
                .where("Ad_ID", "=", row.ad_id)
                .executeTakeFirstOrThrow();
        } else {
            await fastify.mainDB
                .insertInto(getTable(brand, "FBAdsLeads"))
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

    return { status: "OK" };
}
