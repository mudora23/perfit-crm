import {TypedFastifyInstance} from "@/types/types";
import { getTable } from "@/utils/tables";
import { AsyncTask } from 'toad-scheduler';

export function run(fastify: TypedFastifyInstance) {

return new AsyncTask(
    '@/schedule/perfit/website/process_lead.service', async () => {

        fastify.log.info("Running perFIT Website - Process Lead");

        const brand = "perFIT";
        const limit = 1;

        // Check if there's rows to process
        const rows = await fastify.mainDB
            .selectFrom("integrations.website_webhook")
            .selectAll()
            .where("brand", "=", brand)
            .where("row_proceed_start", "is", null)
            .orderBy("row_created_at", "asc")
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

            const data = JSON.parse(row.webhook_data as string);

            const getSource = () => {
                if(data.utm_source == "Google") return "Google";
                else if(data.utm_source == "YouTube") return "YouTube";
                else if(data.utm_source == "Facebook") return "Facebook";
                else if(data.utm_source == "Instagram") return "Instagram";
                else return "Organic";
            }

            // Mark row as processing
            await fastify.mainDB
                .updateTable("integrations.website_webhook")
                .set({
                    row_proceed_start: new Date(),
                })
                .where("id", "=", row.id)
                .executeTakeFirstOrThrow();

            const updated_at = new Date();

            // Prepare data
            const leadData = {
                "姓名": (data.name_title || "") + (data.full_name || ""),
                "平台": "Website",
                "查詢日期": data.registration_date,
                "聯絡電話": data.mobile,
                "來源": getSource(),
                "預約到店日期": data.desire_date ? new Date(data.desire_date) : null,
                "電子郵件": data.email,
                "願意接收最新資訊及優惠": data.newsletter === "on",
                "landing_url": data.url,

                "User_identifier__uid_": data.uid1,
                "User_IP__uip_": data?.headers?.["x-real-ip"] || null,

                "Campaign_Source__utm_source_": data.utm_source,
                "Campaign_Medium__utm_medium_": data.utm_medium,
                "Campaign_Name__utm_campaign_": data.utm_campaign,
                "Campaign_Term__utm_term_": data.utm_term,
                "Campaign_Content__utm_content_": data.utm_content,

                "Google_Click_Identifier__gclid_": data.gclid || null,
                "Facebook_Click_Identifier__fbclid_": data.fbclid || null,
                "Browser_Information__user_agent_": data?.headers?.["user-agent"] || null,
                "Full_Record__full_record_": JSON.stringify(data),

                "created_at": updated_at,
                "updated_at": updated_at,
            };

            const leadCRMRow = await fastify.mainDB
                .insertInto(getTable(brand, "Leads"))
                .values(leadData)
                .returning("id")
                .executeTakeFirstOrThrow();

            // Mark row as processed
            await fastify.mainDB
                .updateTable("integrations.website_webhook")
                .set({
                    row_proceed_finish: new Date(),
                    row_proceed_to_brand: brand,
                    row_proceed_to_lead_id: leadCRMRow.id,
                })
                .where("id", "=", row.id)
                .executeTakeFirstOrThrow();
        }

    }, (error: any) => {
       console.log(error);
    })

}