import { FastifyRequest, FastifyReply } from "fastify";
import { Static } from '@sinclair/typebox';
import { TypedFastifyInstance } from "@/types/types";
import { findFormInformationMissingSchema } from "@/api/fb_leads/find_form_information_missing.schema";

export async function findFormInformationMissing(
    fastify: TypedFastifyInstance,
    request: FastifyRequest,
    reply: FastifyReply,
    body: Static<typeof findFormInformationMissingSchema.body>
) {

    const existingFormIds = await fastify.mainDB
        .selectFrom("integrations.fb_leads_form_information")
        .select("form_id")
        .execute()
        .then(rows => rows.map(row => row.form_id));

    const requiredForms = await fastify.mainDB
        .selectFrom("integrations.fb_leads_webhook")
        .select(["form_id", "page_id"])
        .execute();

    // remove duplicates
    const uniqueRequiredForms = Array.from(new Map(requiredForms.map(item => [item.form_id, item])).values());

    // remove if form_id is null or page_id is null
    const res = [];
    for (const form of uniqueRequiredForms) {
        if (form.form_id && form.page_id && !existingFormIds.includes(form.form_id)) {
            res.push({
                form_id: form.form_id,
                page_id: form.page_id,
            });
        }
    }
    return res;
}
