import { FastifyRequest, FastifyReply } from "fastify";
import { Static } from '@sinclair/typebox';
import { TypedFastifyInstance } from "@/types/types";
import { getTable } from "@/utils/tables";
import { processWebsiteWebhookSchema } from "@/api/perfit/leads/process_website_webhook.schema";

export async function processWebsiteWebhook(
  fastify: TypedFastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply,
  body: Static<typeof processWebsiteWebhookSchema.body>
) {

    // Check if there's webhook to process
    const webhook = await fastify.mainDB
        .selectFrom("integrations.website_webhook")
        .selectAll()
        .where("brand", "=", "perFIT")
        .where("row_proceed_start", "is", null)
        .orderBy("id", "asc")
        .limit(1)
        .executeTakeFirst();

    // Return if no webhook to process
    if(!webhook) {
        return { status: "No webhook to process" };
    }

    // Mark webhook as processing
    await fastify.mainDB
        .updateTable("integrations.website_webhook")
        .set({
            row_proceed_start: new Date(),
        })
        .where("id", "=", webhook.id)
        .executeTakeFirstOrThrow();

    // Process webhook
    const data = JSON.parse(webhook.webhook_data as string);

    const getSource = () => {
        if(data.utm_source == "Google") return "Google";
        else if(data.utm_source == "YouTube") return "YouTube";
        else if(data.utm_source == "Facebook") return "Facebook";
        else if(data.utm_source == "Instagram") return "Instagram";
        else return "Organic";
    }

    /*
        brand
        web_lead_id
        full_name, mobile, age, email
        desired_store, desired_date
        enquiry
        coupon_code
        term, newsletter

        landing_url, http_referer
        utm_source, utm_medium, utm_campaign, utm_term, utm_content
        fbclid, gclid
        uid1, uip1
        user_agent
     */
    const lead = await fastify.mainDB
        .insertInto(getTable("perFIT", "leads"))
        .values({
            "姓名": data.full_name,
            "平台": "Website",
            "查詢日期": webhook.row_created_at,
            "聯絡電話": data.mobile,
            "電子郵件": data.email,
            "FB Ads_id": null,
            "來源": getSource(),
            "查詢內容__其他_": data.enquiry,
            "Coupon": data.coupon_code,
            "Branch": data.desired_store,
            "跟進後用戶情況": null, // Active, Inactive, Consent, Member, Reject, Unallied, JOIN, X P
            "Keyman__人名_": null,
            "預約到店日期": null,
            "實際到店日期": null,
            "入會類別": null,
            "首次付款金額": null,
            "Remarks": null,

            "願意接收最新資訊及優惠": !!data.newsletter,
            "landing_url": data.landing_url,

            "User_identifier__uid_": data.uid1,
            "User_IP__uip_": data.uip1,
            "Campaign_Source__utm_source_": data.utm_source,
            "Campaign_Medium__utm_medium_": data.utm_medium,
            "Campaign_Name__utm_campaign_": data.utm_campaign,
            "Campaign_Term__utm_term_": data.utm_term,
            "Campaign_Content__utm_content_": data.utm_content,
            "Google_Click_Identifier__gclid_": data.gclid,
            "Facebook_Click_Identifier__fbclid_": data.fbclid,
            "Browser_Information__user_agent_": data.user_agent,
            "Full_Record__full_record_": JSON.stringify(body),

        })
        .returning(["id"])
        .executeTakeFirstOrThrow();

    // Mark webhook as processed
    await fastify.mainDB
        .updateTable("integrations.website_webhook")
        .set({
            row_proceed_finish: new Date(),
            row_proceed_to_brand: "perFIT",
            row_proceed_to_lead_id: lead.id,
        })
        .where("id", "=", webhook.id)
        .executeTakeFirstOrThrow();

    return { status: "OK" };

}
