import { FastifyRequest, FastifyReply } from "fastify";
import { Static } from '@sinclair/typebox';
import { TypedFastifyInstance } from "@/types/types";
import { getTable } from "@/utils/tables";
import { automateImportFromWebsiteSchema } from "@/api/perfit/leads/automate_import_from_website.schema";

export async function automateImportFromWebsite(
  fastify: TypedFastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply,
  body: Static<typeof automateImportFromWebsiteSchema.body>
) {

    const { brand, registrationDate, nameTitle, fullName, mobile, email, enquiry, branch, coupon, term, promotion, landing_url, uid, uip, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid, user_agent } = body;

    const getSource = () => {
        if(utm_source == "Google") return "Google";
        else if(utm_source == "YouTube") return "YouTube";
        else if(utm_source == "Facebook") return "Facebook";
        else if(utm_source == "Instagram") return "Instagram";
        else return "Organic";
    }

    await fastify.mainDB
        .insertInto(getTable(brand, "leads"))
        .values({
            "姓名": (nameTitle || "") + (fullName || ""),
            "平台": "Website",
            "查詢日期": registrationDate || new Date(),
            "聯絡電話": mobile,
            "電子郵件": email,
            "FB Ads_id": null,
            "來源": getSource(),
            "查詢內容__其他_": enquiry,
            "Coupon": coupon,
            "Branch": branch,
            "跟進後用戶情況": null, // Active, Inactive, Consent, Member, Reject, Unallied, JOIN, X P
            "Keyman__人名_": null,
            "預約到店日期": null,
            "實際到店日期": null,
            "入會類別": null,
            "首次付款金額": null,
            "Remarks": null,

            "願意接收最新資訊及優惠": !!promotion,
            "landing_url": landing_url,

            "User_identifier__uid_": uid,
            "User_IP__uip_": uip,
            "Campaign_Source__utm_source_": utm_source,
            "Campaign_Medium__utm_medium_": utm_medium,
            "Campaign_Name__utm_campaign_": utm_campaign,
            "Campaign_Term__utm_term_": utm_term,
            "Campaign_Content__utm_content_": utm_content,
            "Google_Click_Identifier__gclid_": gclid,
            "Facebook_Click_Identifier__fbclid_": fbclid,
            "Browser_Information__user_agent_": user_agent,
            "Full_Record__full_record_": JSON.stringify(body),

        })
        .executeTakeFirstOrThrow();

    return { status: "OK" };

}
